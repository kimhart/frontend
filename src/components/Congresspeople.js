import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import RepBio from './RepBio';


class Congresspeople extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
      super(props);
      if (props.zipcode) {
        this.props.relay.setVariables({ zipcode: props.zipcode });
      }
    }

    componentWillUpdate(nextProps, nextState) {
      let { zipcode: currentZipcode } = this.props;
      let { zipcode: nextZipcode } = nextProps;
      if (currentZipcode !== nextZipcode) {
        this.props.relay.setVariables({zipcode: nextZipcode});
      }
    }

    getReps = (reps) => {
      return reps.map((rep, index) => {
        return (
          <RepBio name={rep.name} bioID={rep.bioID} key={index} />
        )
      })
    }

    render() {
      let { congresspeople } = this.props.data;
      if (!congresspeople) return null;
      return (
        <div className="three columns">
          { this.getReps(congresspeople) }
        </div>
      );
    }
}

export default Relay.createContainer(Congresspeople, {
  initialVariables: {
    zipcode: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        congresspeople(zipcode: $zipcode) {
          name
          bioID
        }
      }
    `
  }
});

