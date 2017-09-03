import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from './Attendance';
import Beliefs from './Beliefs';
import Participation from './Participation';
import Efficacy from './Efficacy';
import MembershipStats from './MembershipStats';
import PolicyAreas from './PolicyAreas';
import { IconClose, IconStamp, IconAngleDown, IconPhone, IconFacebook, IconTwitter, IconLocation, IconStats, IconBeliefs, IconBio, IconSpeech } from '../icons/Icons';

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
        <div className={`card-toggle ${tab == 'stats' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'stats' })}>
            <IconStats fill={tab == 'stats' ? '#F0454B' : '#7f8494'}/>
            Stats
          </div>
        <div className={`card-toggle ${tab == 'beliefs' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'beliefs' })}>
          <IconBeliefs fill={tab == 'beliefs' ? '#F0454B' : '#7f8494'} />
          Beliefs
        </div>
        {/* <div className={`card-toggle ${tab == 'speech' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'speech' })}>
        <IconSpeech fill={tab == 'speech' ? '#F0454B' : '#7f8494'} />
        Speech</div> */}
        <div className={`card-toggle ${tab == 'bio' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'bio' })}>
          <IconBio fill={tab == 'bio' ? '#F0454B' : '#7f8494'} />
          Bio
        </div>
      </div>
    );
  }

  toggleExplainer = () => {
    let { showExplainer } = this.state;
    this.setState({
      showExplainer: !showExplainer
    });
  }

  formatUrl = (url) => {
    let newUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
    return newUrl.replace(/\/$/, "");
  }

  getCardContent = () => {
    let { contact, bio, tab, leadership_position } = this.state;
    let { chamber, name, bio_text } = this.props;
    let lastName = name.split(',')[0];
    let list = bio_text.split('; ');

    let tabs = {
      stats: (
        <div className="rep-card-metrics-wrap">
          <div className="rep-card-section-divider">
            <div className="card-tab-description">These scores contribute to {lastName}'s grade:
              {/* <span className="control-button question-mark-circle" onClick={() => this.toggleExplainer()}>?</span> */}
            </div>
            {/* { this.state.showExplainer &&
            <div className="rep-card-explainer">
              <div className="card-close" onClick={() => this.toggleExplainer()}>
                <IconClose color="white"/>
              </div>
              <div className="explainer-section">
                <p className="explainer-title">Attendance</p>
                <p className="explainer-copy">Days of work {lastName} has attended vs. the total work days in this term.</p>
              </div>
              <div className="explainer-section">
                <p className="explainer-title">Votes</p>
                <p className="explainer-copy">Number of votes {lastName} has cast vs. the total votes held this term.</p>
              </div>
              <div className="explainer-section">
                <p className="explainer-title">Bills</p>
                <p className="explainer-copy">Number of bills {lastName} has sponsored vs. the <em>most</em> bills sponsored by a single rep this term.</p>
              </div>
              <div className="explainer-section">
                <p className="explainer-title">Committees</p>
                <p className="explainer-copy">Number of congressional committees {lastName} has joined, compared to the highest number of committees joined by a single rep.</p>
              </div>
              <button className="close-explainer button--medium button--white" onClick={() => this.toggleExplainer()}><span className="button-contents">Got it</span></button>
            </div>
            } */}
            { !this.state.showExplainer &&
            <div>
              <div className="rep-card-donut-charts">
                <Attendance {...this.props} />
                <Participation {...this.props} />
                <Efficacy {...this.props} />
                <MembershipStats {...this.props} />
              </div>
            </div>
            }
          </div>
          <div className="rep-card-section-divider">
            <p className="card-tab-description bills">{lastName} has sponsored bills in these categories:</p>
            <PolicyAreas {...this.props} />
          </div>
        </div>
      ),
      beliefs: (
        <div className="rep-card-metrics-wrap">
          <Beliefs {...this.props} />
        </div>
      ),
      bio: (
        <div className="rep-card-details-wrap">
          <ul className="rep-card-bio-list">
            { list.map((item, index) => !['none'].includes(item) ? (
              <li className="rep-card-bio-list-item" key={`${item}${index}`}>{item}</li>
            ) : null)}
          </ul>
        </div>
      )
    }
    return tabs[tab] || null;
  }

  render() {
    let { bioguide_id, district, chamber, letter_grade, leadership_position, name, party, state, data, phone, twitter_handle, facebook, address, bio_text, website } = this.props;
    let { tab, contact, bio } = this.state;
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');

    return (
      <div className="rep-card-content">
        { this.props.close &&
          <div className="card-close" onClick={() => this.props.close()}>
            <IconClose color="#4990E2"/>
          </div>
        }
        <div className="rep-card-header-wrap">
          <div className="rep-letter-grade-wrap">
            <IconStamp fill="#3A7ADB" />
            <span className="rep-letter-grade">{letter_grade}</span>
          </div>
          <div className="rep-card-photo" style={{background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}}/>
          <h1 className="rep-card-name">{ fullName }</h1>
          <div className="rep-card-position-wrap">
            <span className="rep-card-role">
              { this.formatParty(party) } &bull; { chamber.replace(/\b\w/g, l => l.toUpperCase()) } &bull; { state } { chamber === 'house' && <span>&bull; District {district}</span> }
            </span>
            { leadership_position !== "None" && <span className="rep-card-leadership">{ leadership_position }</span> }
          </div>
          <div className="rep-card-buttons-wrap">
            <button className={`contact-btn button--medium button--outline button--blue`} onClick={() => this.setState({ contact: !contact })}>{contact ? <span className="back-btn"><IconAngleDown transform="rotate(90)" fill="#3A7ADB"/>Back</span> : 'Contact'}</button>
          </div>
          {contact &&
          <div className="contact-container">
            <div className="contact-row">
              <a target="_blank" href={`tel:${phone}`}>
                <div className="contact-icon-circle"><IconPhone /></div>{phone}
              </a>
            </div>
            <div className="contact-row">
              <a target="_blank" href={`https://${website}`}>
                <div className="contact-icon-circle"><IconFacebook /></div>
                {this.formatUrl(website)}
              </a>
            </div>
            <div className="contact-row">
              <a target="_blank" href={`https://twitter.com/${twitter_handle}`}>
                <div className="contact-icon-circle"><IconTwitter /></div>
                {twitter_handle}
              </a>
            </div>
            <div className="contact-row">
              <a target="_blank" href={`https://${facebook}`}>
                <div className="contact-icon-circle"><IconFacebook /></div>{this.formatUrl(facebook)}
              </a>
            </div>
            <div className="contact-row">
              <a target="_blank" href={`http://maps.google.com/?q=${address}`}>
                <div className="contact-icon-circle"><IconLocation /></div>
                {address}
              </a>
            </div>
          </div>
          }
          {!contact && this.getMetricsTabs() }
        </div>
        { !contact && this.getCardContent() }
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
