import React from 'react';
import Relay from 'react-relay';
import { isLoading } from '../../utils/Utils';
import BeliefRange from './BeliefRange';
import { IconAngleDown, IconSearch } from '../icons/Icons';

class Speech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speech: [],
      search_terms: []
    };
    props.relay.setVariables({ bioguide_id: props.bioguide_id, search_terms: props.search_terms }, ({ done, aborted, error }) => {
      if (done || aborted || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }

  // handleSearch = _.debounce(() => {
  //   this.props.relay.setVariables({
  //     search_terms: this.searchBox.value,
  //     bioguide_id: this.props.bioguide_id
  //   }, ({ aborted, done, error }) => {
  //     if (aborted || done || error) {
  //       isLoading(false);
  //     }
  //   });
  //   isLoading(true);
  // }, 300);

  handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log(this.searchBox.value)
    }
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
    const { search_terms } = this.state;
    const lastName = this.props.name.split(',')[0];
    return (
      <div className="card-section-speech">
        <div className="card-section-header-wrap">
          <span className="card-section-description">Analysis of {lastName}'s speech on the floor this session, according to official Congressional transcripts. </span>
        </div>
        <div className="rank-search speech-search">
          <input className="rank-search-filter no-focus-style" placeholder="Search keywords..." ref={c => this.searchBox = c} onKeyPress={(e) => this.handleSearch(e)}/>
          <div className="search-bar-icon">
            <IconSearch width="20px" fill="#3A7ADB" />
          </div>
        </div>
        <div className="speech-search-header">
          { search_terms.length > 0 ? `Results for ${search_terms}:` : "Most-spoken phrases:" }
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
    search_terms: null
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
      search_speech(bioguide_id: $bioguide_id, search_terms: $search_terms) {
        date
        speaker
        speaker_text
        subject
      }
    }
  `
  }
});
