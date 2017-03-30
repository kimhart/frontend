import React from 'react';
import Relay from 'react-relay';
import Modal from 'react-modal';
import ReportCard from '../reps/ReportCard';

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

  render() {
    let { photo_url, bioguide_id, name } = this.props;
    let { active } = this.state;
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');
    console.log(this.props);
    return (
      <li className="search-result-list-item" onClick={() => this.setState({ active: true })}>
        <div className="search-result-list-item-photo" style={{ background: `url(${this.getPhotoSource(photo_url)}) no-repeat center 10% / cover`}} />
        <div className="search-result-list-item-name">{ fullName }</div>
        <Modal key={`search_reportcard_${bioguide_id}`} contentLabel={`${fullName} modal`} className={`modal-card`} isOpen={active} style={{ overflowY: 'scroll' }}>
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
