import React, { Component, PropTypes } from 'react';

class RepBio extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
      let { name, bioID, index } = this.props;
      return (
          <div className="rep-container" key={index}>
            <p className="rep-names">{ name }</p>
            <div className="rep-photo-container">
              <img className="rep-photo" src={`./img/bio_images/${ bioID }.png`} />
            </div>
          </div>
      );
    }
}

export default RepBio;
