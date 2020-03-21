import React from 'react';
import { Bar } from 'react-chartjs-2';

class SideView extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = { 
      str: ""
    };
    //Bind Update Methods
    this.analyzeEvent = this.analyzeEvent.bind(this);

    this.chartReference = React.createRef();
    this.data = {
      labels: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Q','Y','Z'],
      datasets: [{
        label: "Frequency",
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      }]
    };
  }

  frequency() {
    var str = this.state.str;
    for(const element of str) {
      let i = this.data.labels.indexOf(element);
      this.data.datasets[0].data[i]++;
      };
  }

  analyzeEvent(){
    this.setState({str: this.props.getStr()});
    this.frequency();
  }

  render() {
    return(
      <div>
        <Bar ref={this.chartReference} data={this.data}/>
        <h3>here</h3>
        <button onClick={this.analyzeEvent}>Analyze</button>
      </div>
    );
  }
}

export default SideView;