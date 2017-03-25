import React from 'react';
import Relay from 'react-relay';
import BasicDonutChart from '../charts/BasicDonutChart';

class Attendance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, congress: "current", chamber: props.chamber });
  }

  getStyles = () => {
    let { attendance } = this.props.data;
    const atWorkPercent = attendance ? (attendance.percent_at_work * 100) : null;
    let color;
    let darkerColor;

    if (atWorkPercent < 50) {
      color = ' #D95852';
      darkerColor = '#D05350';
    } else if (atWorkPercent > 50 && atWorkPercent < 75) {
      color = '#f4c542';
      darkerColor = '#D9AF3B';
    } else if (atWorkPercent > 75) {
      color = '#93db76';
      darkerColor = '#89CB71';
    };

    let sliderStyle = {
      background: `linear-gradient(${darkerColor}, ${color}, ${darkerColor})`,
      width: `${atWorkPercent}%`
    };

    return sliderStyle;
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
