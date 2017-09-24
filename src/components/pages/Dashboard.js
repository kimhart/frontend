import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import RepInfoCluster from './../reps/RepInfoCluster';
import ReportCard from './../reps/ReportCard';
import { UserUtils } from './../../utils/Utils';
import { Link, browserHistory } from 'react-router';
import TallyModal from '../modal/TallyModal';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    let { user } = props;
    let coords = { longitude: null, latitude: null, state: '', zip: null };
    if (!user && !UserUtils.isValidUserId(UserUtils.getUser())) {
      user = { district: null, state_long: null };
      if (sessionStorage.getItem('tally::coords')) {
        coords = JSON.parse(sessionStorage.getItem('tally::coords'))
        props.relay.setVariables({ search_term: coords.zip })
      } else {
        this.guessLocation();
      }
    } else {
      props.relay.setVariables({ district: parseInt(user.district), state_long: user.state_long });
      coords = { longitude: null, latitude: null, state: '', zip: null };
    }
    this.state = { coords, user, activeReportCard: null, reps: [] };
  }

  getZipFromCoords = (latitude, longitude) => {
    const GoogleMapsAPI = 'https://maps.googleapis.com/maps/api';
    const url = `${GoogleMapsAPI}/geocode/json?latlng=${latitude},${longitude}`;

    return fetch(url).then(res => res.json()).then(json => {
      return {
        zip: json.results[0].address_components.find(({ types }) => types.includes('postal_code')).long_name,
        state: json.results[0].address_components.find(({ types }) => types.includes('administrative_area_level_1')).long_name,
      };
    })
  }

  componentWillUpdate(nextProps, nextState) {
    let { longitude: prevLong, latitude: prevLat } = this.state.coords;
    let { longitude, latitude } = nextState.coords;
    if (prevLong !== longitude || prevLat !== latitude) {
      this.getZipFromCoords(latitude, longitude)
      .then(({ zip, state }) => {
        this.setState(prevState => {
          const coords = {
            ...prevState.coords,
            state,
            zip
          }
          sessionStorage.setItem('tally::coords', JSON.stringify(coords));
          return { coords }
        });
        nextProps.relay.setVariables({ search_term: zip })
      })
      .catch(error => {
        this.setState({ error })
      });
    }

    let { reps: prevReps } = this.props.data;
    let { reps } = nextProps.data;
    if (!prevReps && reps) {
      Object.assign(nextState, { reps });
    }

    let { search: prevSearch } = this.props.data;
    let { search } = nextProps.data;
    if (prevSearch && search && prevSearch.length !== search.length) {
      Object.assign(nextState, { reps: search });
    }

    let { user: prevUser } = this.props;
    let { user } = nextProps;
    if (!prevUser && user) {
      nextProps.relay.setVariables({ district: parseInt(user.district), state_long: user.state_long });
      Object.assign(nextState, { user, coords: { longitude: null, latitude: null, state: '', zip: null } });
      navigator.geolocation.clearWatch(this.geoId)
    }
  }

  guessLocation = () => {
    if (window.hasOwnProperty('navigator')) {
      this.geoId = navigator.geolocation.watchPosition(
        (position) => {
          this.setState(prevState => ({
            coords: {
              ...prevState.coords,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }))
        },
        (error) => {
          console.error(error);
          this.setState({ coords_error: error })
        }
      );
    }
  }

  getRepInfoClusters = () => {
    let { reps } = this.state;
    return reps ? reps.map(rep => <RepInfoCluster {...this.props} key={`repinfocluster_${rep.bioguide_id}`} {...rep} onClick={() => this.setState({ activeReportCard: rep.bioguide_id })}/>) : null;
  }

  getReportCardsAsModals = () => {
    let { activeReportCard, reps } = this.state;
    return reps
    ? reps.map(rep => {
      return (
        <TallyModal key={`reportcard_${rep.bioguide_id}_modal`} contentLabel={`${rep.name} modal`} className={`rep-card-wrap`} isOpen={rep.bioguide_id === activeReportCard} style={{ overflowY: 'scroll' }}>
          <ReportCard {...this.props} {...rep} close={() => this.setState({ activeReportCard: null })} />
        </TallyModal>
      );
    })
    : null;
  }

  getReportCards = () => {
    let { activeReportCard, reps } = this.state;
    return reps
    ? reps.map(rep => {
      return (
        <div key={`reportcard_${rep.bioguide_id}_wrap`} className={`rep-card-wrap`}>
          <ReportCard key={`reportcard_${rep.bioguide_id}`} {...this.props} {...rep} />
        </div>
      );
    })
    : null;
  }

  getActiveReportCard = () => {
    let { activeReportCard, reps } = this.state;
    let rep = reps && activeReportCard ? reps.find(({ bioguide_id }) => bioguide_id === activeReportCard) : null;
    return rep ? <ReportCard {...this.props} {...rep} key={`reportcard_${rep.bioguide_id}`} close={() => this.setState({ activeReportCard: null })} /> : null;
  }

  getDistrict = (user) => user.district === 0 ? 'At Large' : user.district;

  render() {
    let { user, coords, coords_error } = this.state;
    return (
      <div className="main-dash">
        <div className="blue-header">
          { !user.state_long && !coords.latitude && !coords.longitude && !coords_error &&
            <h3 key="your-reps-h3" className="headline">
              Determining Your Representatives
            </h3>
          }
          { user.state_long && [
            <h3 key="your-reps-h3" className="headline">
              Your Representatives
            </h3>,
            <p key="your-reps-p" className="your-district">
              <svg className="state-icon">
                <use xlinkHref={ `#icon-${user.state_long.replace(/\s/g, '-')}` }/>
              </svg>
              <br/>
              <span className="state">{user.state_long} </span>District {this.getDistrict(user)}
            </p>
          ]}
          { coords.latitude && coords.longitude && [
            <h3 key="your-reps-h3" className="headline">
              Potential Representatives for Your ZIP Code
            </h3>,
            <p key="your-reps-p" className="your-district">
              <svg className="state-icon">
                <use xlinkHref={ `#icon-${coords.state.replace(/\s/g, '-')}` }/>
              </svg>
              <br />
              <span className="state">{coords.state}</span>
            </p>
          ]}
          { coords_error &&
            <h3 key="your-reps-h3" className="headline">
              Uh-oh! You'll Need to Enable Location to Find Representatives in Your Area.
            </h3>
          }
        </div>
        <span className="tap-a-rep">Click on each rep to learn more:</span>
        <div className="rep-info-clusters mobile">
          {this.getRepInfoClusters()}
          {this.getReportCardsAsModals()}
        </div>
        <div className="rep-info-clusters desktop">
          {this.getReportCards()}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(DashboardPage, {
  initialVariables: {
    district: null,
    state_long: null,
    search_term: null,
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        reps(district: $district, state_long: $state_long) {
          address
          bio_text
          bioguide_id
          chamber
          congress_url
          district
          facebook
          leadership_position
          letter_grade
          name
          number_grade
          party
          phone
          photo_url
          served_until
          state
          twitter_handle
          twitter_url
          website
          year_elected
        }
        search(search_term: $search_term) {
          address
          bio_text
          bioguide_id
          chamber
          congress_url
          district
          facebook
          leadership_position
          letter_grade
          name
          number_grade
          party
          phone
          photo_url
          served_until
          state
          twitter_handle
          twitter_url
          website
          year_elected
        }
        ${ReportCard.getFragment('data')}
      }
    `
  }
});
