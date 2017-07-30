import React from 'react';
import Relay from 'react-relay';
import { isLoading } from '../../utils/Utils';
import BeliefRange from './BeliefRange';
import { IconAngleDown } from '../icons/Icons';

class Beliefs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      level: 'overall'
    };
    props.relay.setVariables({ bioguide_id: props.bioguide_id }, ({ done, aborted, error }) => {
      if (done || aborted || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }

  swapBeliefNames(type) {
    if (type === 'lgbt rights') { type = "LGBTQ+ Rights" }
    if (type === 'obamacare') { type = "Obamacare (ACA)" }
    if (type === 'abortion') { type = "Women's Reproductive Health" }
    if (type === 'women and minority rights') { type = "Minority Rights" }
    return type;
  }

  renderBeliefs({ beliefs, level }) {
    let isClickable = level === "overall";
    return [beliefs.filter(belief => belief.type === level).map(belief => {
      let { type, bioguide_id, sub_type_of, tally_score } = belief;
      return (
        <div key={`${bioguide_id}${sub_type_of}${type}`} className="rep-belief-item" onClick={() => this.setState({ level: type === 'overall' ? 'overall' : sub_type_of })}>
          <div className="rep-belief-item-type">
            { type }&nbsp;
          </div>
          { !isClickable
            ? (
              <a className="clickable"
                onClick={() => this.setState({ level: type === 'overall' ? 'overall' : sub_type_of })}
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 10
                }}
              >
                <IconAngleDown fill="#000000" transform="rotate(90)" /><span className="back-to-overall">Back</span>
              </a>
            )
            : null
          }
          <BeliefRange {...this.props} {...belief} />
        </div>
      )
    }), beliefs.filter(belief => belief.sub_type_of === level).map(belief => {
      let { type, bioguide_id, sub_type_of, tally_score } = belief;
      return (
        <div
          key={`${bioguide_id}${sub_type_of}${type}`}
          className={`rep-belief-item ${isClickable ? 'clickable' : ''}`}
          onClick={
            isClickable
            ? () => this.setState({ level: type || level })
            : () => null
          }
        >
          <div className="rep-belief-item-type">{this.swapBeliefNames(type)}</div>
          <BeliefRange {...this.props} {...belief} />
        </div>
      )
    })];
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data.beliefs) {
      let { beliefs } = nextProps.data;
      Object.assign(nextState, {
        beliefs: beliefs.map(belief => ({
          ...belief,
          children: beliefs.filter(b => b.sub_type_of === belief.type)
        }))
      });
    }
  }

  render() {
    let { beliefs, level } = this.state;
    if (!beliefs) return null;
    else if (!beliefs.length) {
      return (
        <div>
          <p className="rep-card-section-subtitle">This rep has not been in office long enough to predict their ideology yet.</p>
        </div>
      )
    }
    return (
      <div>
        <p className="rep-card-section-subtitle">Click on a section to explore more.</p>
        <div>{ this.renderBeliefs({ beliefs, level }) }</div>
      </div>
    );
  }

}

export default Relay.createContainer(Beliefs, {
  initialVariables: {
    bioguide_id: null,
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
      beliefs(bioguide_id: $bioguide_id) {
        bioguide_id
        sub_type_of
        tally_score
        total_actions
        type
      }
    }
  `
  }
});
