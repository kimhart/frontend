import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

class BasicDonutChart extends React.Component {

  buildChart = (container) => {
    let { width, height, value, max } = this.props;
    let radius = Math.min(width, height) / 2;

    let arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 20)

    let pie = d3.pie()
    .sort(null)
    .value(({ value }) => value);

    let svg = d3.select(container).append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

    let g = svg.selectAll('.arc')
    .data(pie([{ value, background: false }, { value: max - value, background: true }]))
    .enter().append('g')
    .attr('class', ({ data }) => {
      return `arc ${data.background ? 'background' : 'value'}`
    })

    g.append('path')
    .attr('d', arc)
    .style('fill', '#41EAD4')
    .style('opacity', ({ data }) => {
      return data.background ? '0.2' : '1';
    })
    // .transition()
    // .ease(d3.easeElastic)
  }

  render() {
    let { value, max, height, width, label } = this.props;
    let container = new ReactFauxDOM.Element('div');
    this.buildChart(container);
    let styles = {
      position: 'absolute',
      height,
      width,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
    return (
      <div className="basic-donut-chart" style={{ position: 'relative', marginBottom: height/4 }}>
        <div className="basic-donut-chart-middle" style={{ ...styles, alignItems: 'center' }}><p style={{ fontSize: 22 }}>{ `${value}/${max}` }</p></div>
        <div className="basic-donut-chart-label" style={{ ...styles, alignItems: 'flex-end', top: height/4 }}><p style={{ fontSize: 18 }}>{ label }</p></div>
        { container.toReact() }
      </div>
    );
  }

}

export default BasicDonutChart;
