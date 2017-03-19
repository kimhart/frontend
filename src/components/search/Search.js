import React from 'react';
import Relay from 'react-relay';

class Search extends React.Component {

  componentDidMount() {
    this.searchBox.focus();
  }

  render() {
    return (
      <div className="search-wrap">
        <input type="text" className="search-input-text" id="search-input-text" ref={c => this.searchBox = c} />
      </div>
    );
  }

}

export default Relay.createContainer(Search, {
  initialVariables: {
    search_query: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
    }
  `
  }
});
