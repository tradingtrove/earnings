import React from 'react';

class EarningChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { actMax } = this.props.actQrt;
    const { actMin } = this.props.actQrt;
    const { actualearning } = this.props.earning;
    const actSpot = (actualearning - actMin) / (actMax - actMin) * 120;
    const { estimatedearning } = this.props.earning;
    const estSpot = (estimatedearning - actMin) / (actMax - actMin) * 120;
    return (
     <div className='EPS-date'>
      <span className='EstimatedCircle'></span>
      <span style = {{ marginTop: -estSpot - 55 }} className='estCircle'></span>
      <span style = {{ marginTop: -actSpot - 55 }} className='actCircle'></span>
      <div>{this.props.earning.quarter}</div>
     </div>
    );
  }
}

export default EarningChart;
