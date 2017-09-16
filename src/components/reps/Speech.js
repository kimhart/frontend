import React from 'react';
import Relay from 'react-relay';
import { isLoading } from '../../utils/Utils';
import BeliefRange from './BeliefRange';
import { IconAngleDown, IconSearch, IconClose } from '../icons/Icons';

class Speech extends React.Component {

  constructor(props) {
    super(props);
    this.searchArray = [];
    this.state = {
      speech: [],
      search_terms: []
    };
    props.relay.setVariables({
      bioguide_id: props.bioguide_id
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data.speech) {
      let { speech } = nextProps.data;
      Object.assign(nextState, { speech });
    }
  }

  addSearchTerm = (e) => {
    e.preventDefault();
    this.searchArray.push(this.searchBox.value);
    this.searchForm.reset();
    this.setState({
      search_terms: this.searchArray
    });
    this.props.relay.setVariables({
      search_terms: this.searchArray
    });
  }

  removeSearchTerm = (e, index) => {
    this.searchArray.splice(index, 1);
    this.setState({
      search_terms: this.searchArray
    });
    this.props.relay.setVariables({
      search_terms: this.searchArray
    });
  }

  renderSearchPills = () => {
    let { search_terms } = this.state;
    return search_terms ? search_terms.map((term, index) => {
      return (
        <div className="search-term-pill" key={`${term}${index}`}>
          <span>{term}</span>
          <div className="remove-pill" onClick={(e) => this.removeSearchTerm(e, index)}>
            <IconClose fill="#fff"/>
          </div>
        </div>
      )
    }) : null;
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

  renderSearchResults = () => {
    const { search_speech } = this.props.data;
    return search_speech.map(({ date, speaker, speaker_text, subject }, index) => (
      <div key={`${word}${frequency}${rank}${index}`} className="rep-speech-list-item-wrap">
        <span className="rep-speech-list-item-date">"{ date }"</span>
        <span className="rep-speech-list-item-subject">{subject}</span>
      </div>
    ))
  }

  render() {
    const { search_terms } = this.state;
    const lastName = this.props.name.split(',')[0];
    return (
      <div className="card-section-speech">
        <div className="card-section-header-wrap">
          <span className="card-section-description">Analysis of {lastName}'s speech on the floor this session, according to official Congressional transcripts.</span>
        </div>
        <div className="rank-search speech-search">
          <form className="add-search-term-form" onSubmit={(e) => this.addSearchTerm(e)} ref={c => this.searchForm = c}>
            <input className="rank-search-filter no-focus-style" placeholder="Search keywords..." ref={c => this.searchBox = c} />
          </form>
          <div className="search-bar-icon">
            <IconSearch width="20px" fill="#3A7ADB" />
          </div>
        </div>
          { !search_terms.length &&
            <div>
              <div className="speech-search-header">Most-spoken phrases:</div>
              <div className="speech-top-results-wrap">{this.renderSpeech()}</div>
            </div>
          }
          { search_terms.length > 0 &&
            <div>
              <div className="speech-pill-container">{this.renderSearchPills()}</div>
              <div className="speech-search-results">{this.renderSearchResults()}</div>
            </div>
          }
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
