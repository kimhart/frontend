import React from 'react';
import Relay from 'react-relay';
import _ from 'lodash';

class Search extends React.Component {

  componentDidMount() {
    this.searchBox.focus();
  }

  handleSearch = _.debounce(() => {
    this.props.relay.setVariables({
      search_term: this.searchBox.value
    });
  }, 300);

  getResults = (chamber) => {
    let { search } = this.props.data;
    search = search.filter(({ chamber: this_chamber }) => this_chamber === chamber);
    if (!search.length && (!this.searchBox || (this.searchBox && !this.searchBox.value))) return <span>Search for reps in the text box above.</span>
    if (!search.length && this.searchBox && this.searchBox.value) return <span>No results.</span>
    return (
      <ul className="search-result-list">
        { this.getResultItems(search) }
      </ul>
    );
  }

  getResultItems = (results) => {
    return results.map((result, i) => {
      let { photo_url, name, state } = result;
      return (
        <li key={`${name}${i}`} className="search-result-list-item">
          <img className="search-result-list-item-photo" src={`http://${photo_url}`} />
          <div className="search-result-list-item-name">{ name }</div>
          <div className="search-result-list-item-state">{ state }</div>
        </li>
      );
    })
  }

  render() {
    return (
      <div className="search-wrap">
        <input type="text" className="search-input-text" id="search-input-text" ref={c => this.searchBox = c} onChange={this.handleSearch} />
        <div className="search-result-section">
          <h3 className="search-result-section-title">Senate</h3>
          { this.getResults('senate') }
        </div>
        <div className="search-result-section">
          <h3 className="search-result-section-title">House</h3>
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
        bioguide_id
        chamber
        district
        name
        party
        state
        photo_url
      }
    }
  `
  }
});
