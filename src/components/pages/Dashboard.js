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
    if (!user) {
      user = {
        district: null,
        state_long: null
      }
      if (!UserUtils.isValidUserId(UserUtils.getUser())) {
        this.guessLocation();
      }
    }
    this.state = {
      coords: {
        longitude: null,
        latitude: null
      },
      user,
      activeReportCard: null,
      reps: []
    };
    props.relay.setVariables({ district: parseInt(user.district), state_long: user.state_long });
  }

  getZipFromCoords = (latitude, longitude) => {
    const GoogleMapsAPI = 'https://maps.googleapis.com/maps/api';
    const url = `${GoogleMapsAPI}/geocode/json?latlng=${latitude},${longitude}`;

    return fetch(url).then(res => res.json()).then(json => {
      return json.results[0].address_components.find(({ types }) => types.includes('postal_code')).long_name;
    })
  }

  componentWillUpdate(nextProps, nextState) {
    let { longitude: prevLong, latitude: prevLat } = this.state.coords;
    let { longitude, latitude } = nextState.coords;
    if (prevLong !== longitude || prevLat !== latitude) {
      this.getZipFromCoords(latitude, longitude)
      .then(zip => {
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
  }

  guessLocation = () => {
    if (window.hasOwnProperty('navigator')) {
      navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          })
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
    let { user, coords } = this.state;
    return (
      <div className="main-dash">
        <div className="blue-header">
          <h3 className="headline">Your Representatives</h3>
          { user.state_long &&
            <p className="your-district">
              <svg className="state-icon">
                <use xlinkHref={ `#icon-${user.state_long.replace(/\s/g, '-')}` }/>
              </svg>
              <br/>
              <span className="state">{user.state_long}</span>District {this.getDistrict(user)}
            </p>
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
