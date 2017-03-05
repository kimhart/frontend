import React from 'react';
import Relay from 'react-relay';

class Attendance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, chamber: props.chamber });
  }

  render() {
    let attendance = this.props.data.attendance;
    return (
      <p className="days-at-work">Attendance: {attendance.days_at_work} </p>
    );
  }
}

export default Relay.createContainer(Attendance, {
  initialVariables: {
    bioguide_id: null,
    chamber: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      attendance(bioguide_id: $bioguide_id, chamber: $chamber) {
        days_at_work
        percent_at_work
        total_work_days
      }
    }
  `
  }
});
