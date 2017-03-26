import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from './Attendance';
import Participation from './Participation';
import Efficacy from './Efficacy';
import MembershipStats from './MembershipStats';
import PolicyAreas from './PolicyAreas';
import { IconClose } from '../icons/Icons';

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
    let { contact, bio } = this.state;
    if (contact || bio) {
      let { phone, twitter_handle, facebook, address } = this.props;
      let buttons = { contact, bio };
      console.log(this.props);
      let buttonContent = {
        contact: (
          <ul className="report-card-contact-list">
            <li className="report-card-contact-list-item">
              <span className="report-card-contact-list-item-text">{ phone }</span>
            </li>
            <li className="report-card-contact-list-item">
              <span className="report-card-contact-list-item-text">{ twitter_handle }</span>
            </li>
            <li className="report-card-contact-list-item">
              <span className="report-card-contact-list-item-text">{ facebook }</span>
            </li>
            <li className="report-card-contact-list-item">
              <span className="report-card-contact-list-item-text">{ address }</span>
            </li>
          </ul>
        ),
        bio: 'bio',
      }
      return buttonContent[Object.keys(buttons).find(key => buttons[key])];
    }

    return (
      <div className="report-card-metrics-wrap">
        <h4 className="report-card-section-title">Participation Scores<span className="question-mark-circle"><p className="question-mark">?</p></span></h4>
        <div className="report-card-sliders">
          <Attendance {...this.props} />
          <Participation {...this.props} />
          <Efficacy {...this.props} />
          <MembershipStats {...this.props} />
        </div>
        <h4 className="report-card-section-title">Policies</h4>
        <PolicyAreas {...this.props} />
      </div>
    );
  }

  render() {
    let { bioguide_id, chamber, leadership_position, name, party, state, data } = this.props;
    let { tab, contact, bio } = this.state;
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');

    return (
      <div className="report-card-info">
        <div className="report-card-header-wrap">
          <div className="report-card-photo-wrap">
            <div className="report-card-photo" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}} />
            <div className="report-card-close" onClick={() => this.props.close()}><IconClose width={15} height={15} stroke="#4990E2" strokeWidth="2" /></div>
          </div>
          <span className="report-card-name">{ fullName }</span>
          <span className="report-card-role">{ state } &bull; { chamber.replace(/\b\w/g, l => l.toUpperCase()) } &bull; {this.formatParty(party)}</span>
          { leadership_position !== "None" && <span className="report-card-leadership">{leadership_position}</span> }
          <div className="report-card-buttons-wrap">
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
      ${Attendance.getFragment('data')}
      ${Participation.getFragment('data')}
      ${Efficacy.getFragment('data')}
      ${MembershipStats.getFragment('data')}
      ${PolicyAreas.getFragment('data')}
    }
  `
  }
});
