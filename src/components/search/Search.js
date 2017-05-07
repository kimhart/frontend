import React from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import { Link } from 'react-router';
import { isLoading } from '../../utils/Utils';
import SearchResult from './SearchResult';
import { IconSearch, TallyLogo } from '../icons/Icons';

class Search extends React.Component {

  componentDidMount() {
    this.searchBox.focus();
  }

  handleSearch = _.debounce(() => {
    this.props.relay.setVariables({
      search_term: this.searchBox.value
    }, ({ aborted, done, error }) => {
      if (aborted || done || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }, 300);

  getResults = (chamber) => {
    let { search } = this.props.data;
    search = search.filter(({ chamber: this_chamber }) => this_chamber === chamber);
    let capitalizedChamber = chamber.charAt(0).toUpperCase() + chamber.slice(1);
    if (!search.length && (!this.searchBox || (this.searchBox && !this.searchBox.value))) return <span className="search-result-message search-result-prompt">Try searching for a rep, a district,<br/> a state, or a ZIP code.</span>
    if (!search.length && this.searchBox && this.searchBox.value) return <span className="search-result-message search-result-error">No results.</span>
    return (
      <div className="search-result-section">
        <h3 className="search-result-section-title">{capitalizedChamber}</h3>
        <ul className="search-result-list">
          { this.getResultItems(search) }
        </ul>
      </div>
    );
  }

  getResultItems = (results) => {
    return results.map((result, i) => {
      let { photo_url, name, state } = result;
      return (
        <SearchResult {...this.props} key={`${name}${i}`} {...result} />
      );
    })
  }

  render() {
    return (
      <div className="search-wrap">
        <header className="logo">
          <div className="logo-container">
            <Link to="/">
              <TallyLogo />
              <span className="tally-logo-helper">Tally</span>
            </Link>
          </div>
        </header>
        <div className="search-bar">
          <input type="text" className="search-input-text" placeholder="Search..." id="search-input-text" ref={c => this.searchBox = c} onChange={this.handleSearch} />
          <IconSearch className="search-bar-icon" fill="#fff" />
        </div>
        <div className="search-result-wrap">
          { this.getResults('senate') }
          { this.getResults('house') }
        </div>
      </div>
    );
  }

}

export default Relay.createContainer(Search, {
  initialVariables: {
    search_term: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
      search(search_term: $search_term) {
        address
        bio_text
        bioguide_id
        chamber
        congress_url
        district
        facebook
        leadership_position
        letter_grade
        name
        number_grade
        party
        phone
        photo_url
        served_until
        state
        twitter_handle
        twitter_url
        website
        year_elected
      }
      ${SearchResult.getFragment('data')}
    }
  `
  }
});
