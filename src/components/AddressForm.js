import React, { Component, PropTypes } from 'react';

class AddressForm extends Component {

   static propTypes = {
      className: PropTypes.string,
    };

  constructor(props) {
    super(props);
  }
  
    render() {
      return (
        <form className="address-form">
          <input type="text" placeholder="Street Address" ref="streetInput" />
          <input type="text" placeholder="ZIP code" ref="zipcodeInput" />
          <button type="submit">Get My Reps</button>
        </form>
      );
    }
}

export default AddressForm;
