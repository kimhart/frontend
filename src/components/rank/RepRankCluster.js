import React from 'react';
import Relay from 'react-relay';

class RepRankCluster extends React.Component {

  constructor(props) {
    super(props);
  }

  getPhotoSource = () => {
    let { photo_url } = this.props;
    if (!!photo_url && photo_url.toLowerCase() !== 'none') {
      return `https://www.${photo_url}`;
    } return './img/bio_images/placeholder.png';
  }

  render() {

    let { name } = this.props;
    let fullName = name ? name.split(',').reverse().join().replace(/\,/g,' ') : 'John Doe';

    return (
      <div className="rep-rank-cluster-wrap">
        <div className="rep-rank-headshot" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`, width: '140px'}}>
        </div>
        <div className="rep-rank-stats">
          <p className="rep-rank-name">{fullName}</p>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(RepRankCluster, {
  initialVariables: {
    district: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});
