import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from './Attendance';
import Beliefs from './Beliefs';
import Participation from './Participation';
import Efficacy from './Efficacy';
import MembershipStats from './MembershipStats';
import PolicyAreas from './PolicyAreas';
import { IconClose, IconStamp, IconAngleDown, IconPhone, IconFacebook, IconTwitter, IconLocation } from '../icons/Icons';

class ReportCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: false,
      bio: false,
      tab: 'stats',
      showExplainer: false
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
        <p className={`card-toggle-stats${tab == 'stats' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'stats' })}>Job Scores</p>
        <p className={`card-toggle-stats${tab == 'beliefs' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'beliefs' })}>Beliefs</p>
      </div>
    );
  }

  toggleExplainer = () => {
    let { showExplainer } = this.state;
    this.setState({
      showExplainer: !showExplainer
    });
  }

  getCardContent = () => {
    let { contact, bio, tab, leadership_position } = this.state;
    let { chamber, name } = this.props;
    let lastName = name.split(',')[0];

    if (bio) {
      let { bio_text } = this.props;
      let list = bio_text.split('; ');
      return (
        <div className="rep-card-details-wrap">
          <ul className="rep-card-bio-list">
            { list.map((item, index) => !['none'].includes(item) ? (
              <li className="rep-card-bio-list-item" key={`${item}${index}`}>{item}</li>
            ) : null)}
          </ul>
        </div>
      )
    }

    let tabs = {
      stats: (
        <div className="rep-card-metrics-wrap">
          <div className="rep-card-section-divider">
            <h4 className="rep-card-section-title">Participation</h4>
              { this.state.showExplainer &&
              <div className="rep-card-explainer">
                <span className="close" onClick={() => this.toggleExplainer()}>x</span>
                <p className="rep-card-explainer-headline">Job Score Breakdown</p>
                <p className="rep-card-explainer-copy-header">Attendance</p>
                <p className="rep-card-explainer-copy">Days of work {lastName} has attended vs. the total work days in this term.</p>
                <p className="rep-card-explainer-copy-header">Votes</p>
                <p className="rep-card-explainer-copy">Number of votes {lastName} has cast vs. the total votes held this term.</p>
                <p className="rep-card-explainer-copy-header">Bills</p>
                <p className="rep-card-explainer-copy">Number of bills {lastName} has sponsored vs. the <em>most</em> bills sponsored by a single rep this term.</p>
                <p className="rep-card-explainer-copy-header">Committees</p>
                <p className="rep-card-explainer-copy">Number of congressional committees {lastName} has joined, compared to the highest number of committees joined by a single rep.</p>
                <p className="close-explainer" onClick={() => this.toggleExplainer()}>Got it</p>
              </div>
              }
              { !this.state.showExplainer &&
              <div>
                <p className="rep-card-section-subtitle">Learn more about job scores <span className="show-explainer" onClick={() => this.toggleExplainer()}>here</span>.</p>
                <div className="rep-card-donut-charts">
                  <Attendance {...this.props} />
                  <Participation {...this.props} />
                  <Efficacy {...this.props} />
                  <MembershipStats {...this.props} />
                </div>
              </div>
              }
            </div>
          <h4 className="rep-card-section-title">Bill Topics</h4>
          <p className="rep-card-section-subtitle bills">{lastName}'s sponsored bills and their categories:</p>
          <PolicyAreas {...this.props} />
        </div>
      ),
      beliefs: (
        <div className="rep-card-metrics-wrap">
          <h4 className="rep-card-section-title">Beliefs</h4>
          <p className="rep-card-section-subtitle">Click on a section to explore more.</p>
          <Beliefs {...this.props} />
        </div>
      )
    }
    return tabs[tab] || null;
  }

  render() {
    let { bioguide_id, district, chamber, letter_grade, leadership_position, name, party, state, data, phone, twitter_handle, facebook, address, bio_text } = this.props;
    let { tab, contact, bio } = this.state;
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');

    return (
      <div className="rep-card-content">
        { this.props.close &&
          <div className="rep-card-close" onClick={() => this.props.close()}>
            <IconClose width={15} height={15} stroke="#4990E2" strokeWidth="2" />
          </div>
        }
        <div className="rep-card-header-wrap">
          <div className="rep-letter-grade-wrap">
            <IconStamp fill="#3A7ADB" />
            <span className="rep-letter-grade">{letter_grade}</span>
          </div>
          <div
            className="rep-card-photo"
            style={{
              background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`
            }}
          />
          <h1 className="rep-card-name">{ fullName }</h1>
          <div className="rep-card-position-wrap">
            <span className="rep-card-role">
              { this.formatParty(party) } &bull; { chamber.replace(/\b\w/g, l => l.toUpperCase()) } &bull; { state } { chamber === 'house' && <span>&bull; District {district}</span> }
            </span>
            { leadership_position !== "None" && <span className="rep-card-leadership">{ leadership_position }</span> }
          </div>
          <div className="rep-card-buttons-wrap">
            <button className={`bio-btn${bio ? ' active' : ''}`} onClick={() => this.setState({ bio: !bio, contact: false })}>Bio</button>
            <div className="contact-icons">
              <a target="_blank" href={`tel:${phone}`}>
                <div className="contact-icon-circle"><IconPhone /></div>
              </a>
              <a target="_blank" href={`http://maps.google.com/?q=${address}`}>
                <div className="contact-icon-circle"><IconLocation /></div>
              </a>
              <a target="_blank" href={`https://twitter.com/${twitter_handle}`}>
                <div className="contact-icon-circle"><IconTwitter /></div>
              </a>
              <a target="_blank" href={`https://${facebook}`}>
                <div className="contact-icon-circle"><IconFacebook /></div>
              </a>
            </div>
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
