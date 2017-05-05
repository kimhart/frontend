import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from './Attendance';
import Beliefs from './Beliefs';
import Participation from './Participation';
import Efficacy from './Efficacy';
import MembershipStats from './MembershipStats';
import PolicyAreas from './PolicyAreas';
import { IconClose, IconStamp } from '../icons/Icons';

class ReportCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: false,
      bio: false,
      tab: 'stats'
    };
    props.relay.setVariables({ bioguide_id: props.bioguide_id, chamber: props.chamber });
  }

  getPhotoSource = () => {
    let { photo_url } = this.props;
    if (!!photo_url && photo_url.toLowerCase() !== 'none') {
      return `https://www.${photo_url}`;
    }
    else {
      return './img/bio_images/placeholder.png';
    }
  }

  formatParty = (party) => party === 'Democratic' ? 'Democrat' : party;

  getFirstName = () => {
    let fullName = this.props.name.split(',').reverse().join().replace(/\,/g,' ');
    let lastName = this.props.name.split(',')[0];
    return lastName;
  }

  normalizePhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  getMetricsTabs = () => {
    let { tab, contact, bio } = this.state;
    if (contact || bio) return null;
    return (
      <div className="card-toggle-wrap">
        <p className={`card-toggle-stats${tab == 'stats' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'stats' })}>Stats</p>
        <p className={`card-toggle-stats${tab == 'beliefs' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'beliefs' })}>Beliefs</p>
      </div>
    );
  }

  getCardContent = () => {
    let { contact, bio, tab } = this.state;
    if (contact || bio) {
      let { phone, twitter_handle, facebook, address, bio_text } = this.props;
      let twitterFixed = twitter_handle ? <a target="_blank" href={`https://twitter.com/${twitter_handle}`}>{twitter_handle.split('').pop() === '/' ? twitter_handle.slice(0, -1) : twitter_handle}</a> : null;
      let facebookFixed = facebook !== 'None' ? <a target="_blank" href={`https://${facebook}`}>{facebook.substring(4)}</a> : 'Public account not listed';
      let phoneFixed = phone ? <a href={`tel:${phone}`}>{this.normalizePhoneNumber(phone)}</a> : null;
      let list = contact ? [ phoneFixed, twitterFixed, facebookFixed, address ] : bio_text.split('; ');
      return (
        <div className="rep-card-details-wrap">
          <ul className={`rep-card-${contact ? 'contact' : 'bio'}-list`}>
            { list.map((item, index) => !['none', '#facebook'].includes(item)
              ? (<li className={`rep-card-${contact ? 'contact' : 'bio'}-list-item`} key={`${item}${index}`}>{ item }</li>)
              : null
            )}
          </ul>
        </div>
      );
    }
    let tabs = {
      stats: (
        <div className="rep-card-metrics-wrap">
          <h4 className="rep-card-section-title">
            Participation Scores
            <span className="control-button question-mark-circle">?</span>
          </h4>
          <div className="rep-card-sliders">
            <Attendance {...this.props} />
            <Participation {...this.props} />
            <Efficacy {...this.props} />
            <MembershipStats {...this.props} />
          </div>
          <h4 className="rep-card-section-title">Policies</h4>
          <PolicyAreas {...this.props} />
        </div>
      ),
      beliefs: (
        <div className="rep-card-metrics-wrap">
          <h4 className="rep-card-section-title">
            <span className="control-button question-mark-circle">?</span>
          </h4>
          <Beliefs {...this.props} />
        </div>
      )
    }
    return tabs[tab] || null;
  }

  render() {
    let { bioguide_id, district, chamber, letter_grade, leadership_position, name, party, state, data } = this.props;
    let { tab, contact, bio } = this.state;
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');
    return (
      <div className="rep-card-content">
        <div className="rep-card-close control-button" onClick={() => this.props.close()}>
          <IconClose width={15} height={15} stroke="#4990E2" strokeWidth="2" />
        </div>
        <div className="rep-card-header-wrap">
          <div className="rep-letter-grade-wrap">
            <IconStamp fill="white" />
            <span className="rep-letter-grade">{letter_grade}</span>
          </div>
          <div className="rep-card-photo" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}}></div>
          <h1 className="rep-card-name">{ fullName }</h1>
          <div className="rep-card-position-wrap">
            <span className="rep-card-role">
              { this.formatParty(party) } &bull; { chamber.replace(/\b\w/g, l => l.toUpperCase()) } &bull; { state } { chamber === 'house' && <span>&bull; District {district}</span> }
            </span>
            { leadership_position !== "None" && <span className="rep-card-leadership">{ leadership_position }</span> }
          </div>
          <div className="rep-card-buttons-wrap">
            <button className={`contact-btn${contact ? ' active' : ''}`} onClick={() => this.setState({ contact: !contact, bio: false })}>Contact</button>
            <button className={`bio-btn${bio ? ' active' : ''}`} onClick={() => this.setState({ bio: !bio, contact: false })}>Bio</button>
          </div>
          { this.getMetricsTabs() }
        </div>
        { this.getCardContent() }
      </div>
    );
  }
}

export default Relay.createContainer(ReportCard, {
  initialVariables: {
    bioguide_id: null,
    chamber: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
      ${Beliefs.getFragment('data')}
      ${Attendance.getFragment('data')}
      ${Participation.getFragment('data')}
      ${Efficacy.getFragment('data')}
      ${MembershipStats.getFragment('data')}
      ${PolicyAreas.getFragment('data')}
    }
  `
  }
});
