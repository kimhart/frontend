import React from 'react';
import Relay from 'react-relay';
import RepBio from './RepBio';
import Senators from './Senators';
import Congresspeople from './Congresspeople';
import AddressForm from './AddressForm';

class MainDash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      street: null, 
      zipcode: null
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      street: this.refs.streetInput.value,
      zipcode: this.refs.zipcodeInput.value
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="twelve columns">
            <h2 className="page-title">Your Dashboard</h2>
            <div className="form-container">
              <h3>Check a different address:</h3>
              <AddressForm onSubmit={this.handleClick} />
            </div>
          </div>
        </div>
        <div className="row">
          <Senators {...this.props} {...this.state} />
          <Congresspeople {...this.props} {...this.state} />
        </div>
      </div>
    );
  }

}

export default Relay.createContainer(MainDash, {
  initialVariables: {
    street: null,
    zipcode: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        ${Senators.getFragment('data', )}
        ${Congresspeople.getFragment('data', )}
      }
    `
  }
});
