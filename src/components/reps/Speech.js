import React from 'react';
import Relay from 'react-relay';
import Highlight from 'react-highlighter';
import { isLoading } from '../../utils/Utils';
import BeliefRange from './BeliefRange';
import { IconAngleDown, IconSearch, IconClose } from '../icons/Icons';

class Speech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speech: [],
      search_terms: [],
      view_subject: false
    };
    props.relay.setVariables({
      bioguide_id: props.bioguide_id
    });
  }

  componentDidMount(){
    this.searchBox.focus();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data.speech) {
      let { speech } = nextProps.data;
      Object.assign(nextState, { speech });
    }
  }

  addSearchTerm = (e, topPhrase) => {
    e.preventDefault();
    const searchValue = this.searchBox.value;
    if (!topPhrase && !searchValue) {
      return;
    } else if (topPhrase && !searchValue) {
      const search_terms = [topPhrase];
      this.setState({ search_terms });
      this.props.relay.setVariables({ search_terms });
    } else {
      const search_terms = [ ...this.state.search_terms, searchValue ] || topPhrase;
      this.setState({ search_terms });
      this.props.relay.setVariables({ search_terms });
      this.searchForm.reset();
    }
  }

  removeSearchTerm = (term) => {
    const search_terms = this.state.search_terms.filter(search_term => {
      return search_term !== term
    });
    this.setState({ search_terms });
    this.props.relay.setVariables({ search_terms });
  }

  clearAllSearchTerms = () => {
    this.setState({ search_terms: [] });
    this.props.relay.setVariables({ search_terms: [] });
  }

  handleSubjectView = (view_subject) => {
    this.setState({ view_subject })
  }

  backToSubjects = () => {
    this.setState({ view_subject: false })
  }

  renderSearchPills = () => {
    let { search_terms } = this.state;
    return search_terms.map((term, index) => {
      return (
        <div className="search-term-pill" key={`${term}${index}`}>
          <span>{term}</span>
          <div className="remove-pill" onClick={() => this.removeSearchTerm(term)}>
            <IconClose fill="#fff"/>
          </div>
        </div>
      )
    });
  }

  renderTopPhrases = () => {
    const { speech } = this.state;
    if (!speech.length) {
      `We couldn't find this rep's top phrases. Check back soon!`
    } else {
      return speech.map(({ word, frequency, rank }, index) => (
        <div onClick={(e) => this.addSearchTerm(e, word)} key={`${word}${frequency}${rank}${index}`} className="rep-speech-list-item-wrap">
          <span className="rep-speech-list-item-text">"{ word }"</span>
          <div className="flex-align-center">
            <span className="rep-speech-list-item-frequency">{ `${frequency} ${frequency > 1 ? 'times' : 'time'}` }</span>
            <IconAngleDown width="10px" color="#8b8b8b" />
          </div>
        </div>
      ))
    }
  }

  renderSearchResults = () => {
    const { search_speech } = this.props.data;
    const lastName = this.props.name.split(',')[0];
    return search_speech && search_speech.length > 0 ? search_speech.map(({ date, speaker, speaker_text, subject }, index) => (
      <div onClick={() => this.handleSubjectView(search_speech)} key={`${date}${subject}${index}`} className="rep-speech-list-item-wrap">
        <span className="rep-speech-list-item-date">{new Date(date).toLocaleDateString()}</span>
        <span className="rep-speech-list-item-subject">{subject}</span>
        <IconAngleDown width="10px" color="#3A7ADB" />
      </div>
    )) :
    <div className="no-speech-search-results">We couldn't find any instances of {lastName} speaking about these subjects.</div>
  }

  renderSubjectText = () => {
    const { date, speaker, speaker_text, subject } = this.state.view_subject[0];
    return (
      <div>
        <div className="rep-speech-subject-title">{subject}</div>
        <div className="rep-speech-subject-date">{new Date(date).toLocaleDateString()}</div>
        <div className="rep-speech-subject-text">
          "<Highlight search={this.state.search_terms}>{speaker_text}</Highlight>"
        </div>
      </div>
    );
  }

  render() {
    const { search_terms, view_subject } = this.state;
    const lastName = this.props.name.split(',')[0];
    return (
      <div className="card-section-speech">
        {!view_subject &&
        <div>
          <div className="card-section-header-wrap">
            <span className="card-section-description">Analysis of speech on the House and Senate floor, according to official Congressional transcripts.</span>
          </div>
          <div className="rank-search speech-search">
            <form className="add-search-term-form" onSubmit={(e) => this.addSearchTerm(e)} ref={c => this.searchForm = c}>
              <input className="rank-search-filter no-focus-style" placeholder="Search keywords..." ref={c => this.searchBox = c} />
            </form>
            <div className="search-bar-icon">
              <IconSearch width="20px" fill="#3A7ADB" />
            </div>
          </div>
        </div>
        }
        { !search_terms.length && !view_subject &&
          <div>
            <div className="speech-search-header">Top Phrases Spoken this Session</div>
            <div className="speech-top-results-wrap">{this.renderTopPhrases()}</div>
          </div>
        }
        { search_terms.length > 0 && !view_subject &&
          <div>
            <div className="speech-pill-container">{this.renderSearchPills()}</div>
            <div className="clear-all-search-terms" onClick={() => this.clearAllSearchTerms()}>Clear All Tags</div>
            <div className="speech-search-subheaders">
              <span>Date</span><span>Subject</span>
            </div>
            <div className="speech-search-results-wrap">{this.renderSearchResults()}</div>
          </div>
        }
        { view_subject &&
          <div className="speech-subject-wrap">
            <div onClick={() => this.backToSubjects()} className="back-to-subjects"><IconAngleDown width="10px"/>Back</div>
            {this.renderSubjectText()}
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
