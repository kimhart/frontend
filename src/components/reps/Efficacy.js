import React from 'react';
import Relay from 'react-relay';
import BasicDonutChart from '../charts/BasicDonutChart';

class Efficacy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, congress: "current" });
  }

  getStyles = () => {
    let { efficacy } = this.props.data;
    const sponsorPercent = efficacy ? (efficacy.sponsor_percent * 100) : null;
    let color;
    let darkerColor;

    if (sponsorPercent < 50) {
      color = ' #D95852';
      darkerColor = '#D05350';
    } else if (sponsorPercent > 50 && sponsorPercent < 75) {
      color = '#f4c542';
      darkerColor = '#D9AF3B';
    } else if (sponsorPercent > 75) {
      color = '#93db76';
      darkerColor = '#89CB71';
    };

    let sliderStyle = {
      background: `linear-gradient(${darkerColor}, ${color}, ${darkerColor})`,
      width: `${sponsorPercent}%`
    };

    return sliderStyle;
  }

  render() {
    const { efficacy } = this.props.data;
    const repSponsors = efficacy ? efficacy.rep_sponsor : null;
    const maxSponsors = efficacy ? efficacy.max_sponsor : null;

    return (
      <div className="slider-container">
        <BasicDonutChart value={repSponsors || 0} max={maxSponsors || 100} height={150} width={150} label="Bills" />
      </div>
    );
  }
}

export default Relay.createContainer(Efficacy, {
  initialVariables: {
    bioguide_id: null,
    congress: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      efficacy(bioguide_id: $bioguide_id, congress: $congress) {
        bioguide_id
        max_sponsor
        rep_sponsor
        sponsor_percent
      }
    }
  `
  }
});
