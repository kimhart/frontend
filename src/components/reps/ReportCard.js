import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from './Attendance';
import Beliefs from './Beliefs';
import Speech from './Speech';
import Participation from './Participation';
import Efficacy from './Efficacy';
import MembershipStats from './MembershipStats';
import PolicyAreas from './PolicyAreas';
import { IconClose, IconStamp, IconAngleDown, IconPhone, IconFacebook, IconTwitter, IconLocation, IconStats, IconBeliefs, IconBio, IconSpeech, IconLink } from '../icons/Icons';

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
        <div className={`card-toggle ${tab == 'speech' ? ' active' : ''}`} onClick={() => this.setState({ tab: 'speech' })}>
          <IconSpeech fill={tab == 'speech' ? '#F0454B' : '#7f8494'} />
          Speech
        </div>
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

  formatPhone = (phone) => {
    let phone2 = (""+phone).replace(/\D/g, '');
    let m = phone2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  formatAddress = (address) => {
     if (address.includes('Washington')) {
       return address;
     } else {
       return address = `${address},${<br/>} Washington DC 20510`;
     }
  }

  getCardContent = () => {
    let { contact, bio, tab, leadership_position } = this.state;
    let { chamber, name, bio_text, letter_grade } = this.props;
    let lastName = name.split(',')[0];
    let list = bio_text.replace(/&amp;/g, '&').split('; ');

    let tabs = {
      stats: (
        <div className={`rep-card-metrics-wrap ${contact ? "contact-open" : ""}`}>
          <div className="rep-card-section-divider">
            { this.state.showExplainer &&
              <div className="rep-card-explainer">
                <h2 className="card-section-header">Grade Calculations</h2>
                <div className="card-close" onClick={() => this.toggleExplainer()}>
                  <IconClose width="10px" color="#4b4b4b" />
                </div>
                <div className="explainer-section">
                  <div className="explainer-title">Attendance</div>
                  <div className="explainer-copy">Days of work {lastName} has attended compared to the <strong>total work days</strong> in this term.</div>
                </div>
                <div className="explainer-section">
                  <div className="explainer-title">Votes</div>
                  <div className="explainer-copy">Number of votes {lastName} has cast compared to the <strong>total votes held</strong> this term.</div>
                </div>
                <div className="explainer-section">
                  <div className="explainer-title">Bills</div>
                  <div className="explainer-copy">Number of bills {lastName} has sponsored compared to the <strong>most bills sponsored</strong> by one rep this term.</div>
                </div>
                <div className="explainer-section">
                  <div className="explainer-title">Committees</div>
                  <div className="explainer-copy">Number of congressional committees {lastName} has joined compared to the <strong>most committees joined</strong> by one rep this term.</div>
                </div>
              </div>
            }
            { !this.state.showExplainer &&
            <div>
              <div className="card-section-header-wrap">
                <span className="card-section-description">These scores contribute to {lastName}&apos;s <span className="card-section-grade">{letter_grade}</span> grade.
                <span className="card-section-explainer-toggle" onClick={() => this.toggleExplainer()}>Learn how <IconAngleDown color="#4b4b4b" strokeWidth="3" /></span></span>
              </div>
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
            <div className="card-section-header-wrap">
              <h2 className="card-section-header">Legislation</h2>
              <div className="card-section-description">{lastName} has sponsored bills under these categories:</div>
            </div>
            <PolicyAreas {...this.props} />
          </div>
        </div>
      ),
      beliefs: (
        <div className="rep-card-metrics-wrap">
          <Beliefs {...this.props} />
        </div>
      ),
      speech: (
        <div className="rep-card-metrics-wrap">
          <Speech {...this.props} />
        </div>
      ),
      bio: (
        <div className="rep-card-details-wrap">
          <ul className="rep-card-bio-list">
            { list.map((item, index) => !['none'].includes(item) ? (
              <li className="rep-card-bio-list-item" key={`${item}${index}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
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
            <IconClose color="#3A7ADB"/>
          </div>
        }
        <div className={`rep-card-header-wrap ${contact ? 'contact-open' : ''}`}>
          <div className="rep-letter-grade-wrap">
            <IconStamp fill="#3A7ADB" />
            <span className="rep-letter-grade">{letter_grade}</span>
          </div>
          <div className="rep-card-photo" style={{background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}}></div>
          <h1 className="rep-card-name">{ fullName }</h1>
          <div className="rep-card-position-wrap">
            <span className="rep-card-role">
              { this.formatParty(party) } &bull; { chamber.replace(/\b\w/g, l => l.toUpperCase()) } &bull; { state } { chamber === 'house' && <span>&bull; District {district}</span> }
            </span>
            { leadership_position !== "None" && <span className="rep-card-leadership">{ leadership_position }</span> }
          </div>
          <button className="contact-btn button--large button--outline button--blue" onClick={() => this.setState({ contact: !contact })}>{contact ? <span className="button-contents"><IconAngleDown color="#3A7ADB" strokeWidth="3" />Back</span> : 'Contact'}</button>

          { !contact && this.getMetricsTabs() }
        </div>
        { contact &&
        <div className="contact-container">
          { phone &&
          <a className="contact-row" target="_blank" href={`tel:${phone}`}>
            <div className="contact-icon-circle"><IconPhone /></div>
            {this.formatPhone(phone)}
          </a>
          }
          { website &&
          <a className="contact-row" target="_blank" href={website}>
            <div className="contact-icon-circle"><IconLink /></div>
            {this.formatUrl(website)}
          </a>
          }
          { twitter_handle &&
          <a className="contact-row" target="_blank" href={`https://twitter.com/${twitter_handle}`}>
            <div className="contact-icon-circle"><IconTwitter /></div>
            {this.formatUrl(twitter_handle)}
          </a>
          }
          { facebook !== 'None' &&
          <a className="contact-row" target="_blank" href={`https://${facebook}`}>
            <div className="contact-icon-circle"><IconFacebook /></div>
            {this.formatUrl(facebook)}
          </a>
          }
          { address &&
          <a className="contact-row" target="_blank" href={`http://maps.google.com/?q=${this.formatAddress(address)}`}>
            <div className="contact-icon-circle"><IconLocation /></div>
            {this.formatAddress(address)}
          </a>
          }
        </div>
        }
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
      ${Speech.getFragment('data')}
      ${Attendance.getFragment('data')}
      ${Participation.getFragment('data')}
      ${Efficacy.getFragment('data')}
      ${MembershipStats.getFragment('data')}
      ${PolicyAreas.getFragment('data')}
    }
  `
  }
});
