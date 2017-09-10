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
    if (!speech) {
      `We currently don't have enough data to gather these key terms. Check back soon!`
    } else {
      return speech.map(({ word, frequency, rank }, index) => (
        <div key={`${word}${frequency}${rank}${index}`} className="rep-speech-list-item-wrap">
          <span className="rep-speech-list-item-text">"{ word }"</span>
          <span className="rep-speech-list-item-frequency">{ `${frequency} ${frequency > 1 ? 'times' : 'time'}` }</span>
        </div>
      ))
    }
  }

  render() {
    return (
      <div className="card-section-speech">
        <div className="card-section-header-wrap">
          <span className="card-section-description">Most frequently spoken phrases throughout this session, according to official Congressional transcripts:</span>
        </div>
        <div className="speech-top-results-wrap">
          { this.renderSpeech() }
        </div>
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
