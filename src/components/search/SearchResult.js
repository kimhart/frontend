import React from 'react';
import Relay from 'react-relay';
import Modal from 'react-modal';
import ReportCard from '../reps/ReportCard';
import { IconStamp } from '../icons/Icons';


class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  getPhotoSource = (photo_url) => {
    if (!!photo_url && photo_url.toLowerCase() !== 'none') {
      return `https://www.${photo_url}`;
    } return './img/bio_images/placeholder.png';
  }

  getShortParty = (party) => {
    if (party === 'Democratic') return <span className="democrat-blue">Democrat</span>;
    if (party === 'Independent') return <span className="independent-purple">Independent</span>;
    if (party === 'Republican') return <span className="republican-red">Republican</span>;
    return false;
  }

  render() {
    let { photo_url, bioguide_id, name, party, state, letter_grade } = this.props;
    let { active } = this.state;
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');
    return (
      <li className="search-result-list-item" onClick={() => this.setState({ active: true })}>
        <div className="start">
          <div className="search-result-list-item-photo" style={{ background: `url(${this.getPhotoSource(photo_url)}) no-repeat center 10% / cover`}} />
          <div className="search-result-list-item-name">
            {fullName} <span className="search-result-list-item-party">{this.getShortParty(party)}</span>
          </div>
        </div>
        <div className="end">
          <div className="rep-letter-grade-wrap">
            <IconStamp fill="#3A7ADB" />
            <span className="rep-letter-grade">{letter_grade}</span>
          </div>
        </div>
        <Modal key={`search_reportcard_${bioguide_id}`} contentLabel={`${fullName} modal`} className={`rep-card-wrap`} isOpen={active} style={{ overflowY: 'scroll' }}>
          <ReportCard {...this.props} close={() => this.setState({ active: false })} />
        </Modal>
      </li>
    );
  }

}

export default Relay.createContainer(SearchResult, {
  initialVariables: {
    search_term: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        ${ReportCard.getFragment('data')}
      }
    `
  }
});
