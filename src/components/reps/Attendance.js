import React from 'react';
import Relay from 'react-relay';
import BasicDonutChart from '../charts/BasicDonutChart';

class Attendance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, congress: "current", chamber: props.chamber });
  }

  render() {
    const { attendance } = this.props.data;
    const daysAtWork = attendance ? attendance.days_at_work : null;
    const totalWorkDays = attendance ? attendance.total_work_days : null;

    return (
      <div className="slider-container">
        <BasicDonutChart value={daysAtWork || 0} max={totalWorkDays || 150} height={150} width={150} label="Attendance" />
      </div>
    );
  }
}

export default Relay.createContainer(Attendance, {
  initialVariables: {
    bioguide_id: null,
    congress: null,
    chamber: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      attendance(bioguide_id: $bioguide_id, congress: $congress, chamber: $chamber) {
        days_at_work
        percent_at_work
        total_work_days
      }
    }
  `
  }
});
