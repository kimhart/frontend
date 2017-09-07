import React from 'react';
import Relay from 'react-relay';
import { isLoading } from '../../utils/Utils';
import BeliefRange from './BeliefRange';
import { IconAngleDown } from '../icons/Icons';

class Speech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speech: []
    };
    props.relay.setVariables({ bioguide_id: props.bioguide_id }, ({ done, aborted, error }) => {
      if (done || aborted || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data.speech) {
      let { speech } = nextProps.data;
      Object.assign(nextState, { speech });
    }
  }

  renderSpeech = () => {
    const { speech } = this.state;
    return speech.map(({ word, frequency, rank }, index) => (
      <div key={`${word}${frequency}${rank}${index}`} className="rep-speech-list-item-wrap">
        <span className="rep-speech-list-item-text">"{ word }"</span>
        <span className="rep-speech-list-item-frequency">{ `${frequency} ${frequency > 1 ? 'times' : 'time'}` }</span>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <div className="card-section-header-wrap">
          <div className="card-section-description">
            <span>Analysis of this reps speech and what they at meetings and stuff so you can know</span>
          </div>
        </div>
        { this.renderSpeech() }
      </div>
    )
  }

}

export default Relay.createContainer(Speech, {
  initialVariables: {
    bioguide_id: null,
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
      speech(bioguide_id: $bioguide_id) {
        bioguide_id
        frequency
        rank
        word
      }
    }
  `
  }
});
