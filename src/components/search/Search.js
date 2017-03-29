import React from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import { isLoading } from '../../utils/Utils';
import SearchResult from './SearchResult';

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
    if (!search.length && (!this.searchBox || (this.searchBox && !this.searchBox.value))) return <p className="search-result-prompt">Try searching for a rep, a district,<br/> a state, or a ZIP code.</p>
    if (!search.length && this.searchBox && this.searchBox.value) return <p className="search-result-error">No results.</p>
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
        <div className="search-bar">
          <input type="text" className="search-input-text" placeholder="Search" id="search-input-text" ref={c => this.searchBox = c} onChange={this.handleSearch} />
          <img className="search-input-icon" src="./img/search.svg" />
        </div>
        { this.getResults('senate') }
        { this.getResults('house') }
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
        bioguide_id
        chamber
        district
        name
        party
        state
        photo_url
      }
      ${SearchResult.getFragment('data')}
    }
  `
  }
});
