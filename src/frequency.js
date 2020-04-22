import React from 'react';
import { Bar } from 'react-chartjs-2';

class Frequency extends React.Component {
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

  frequency(str) {
    for(const element of str) {
      let i = this.data.labels.indexOf(element);
      this.data.datasets[0].data[i]++;
      };
  }

  clear() {
    var dataLength = this.data.datasets[0].data.length;
    console.log(dataLength);
    for(let i = 0; i < dataLength; i++)
    this.data.datasets[0].data[i] = 0;
  }

  analyzeEvent(){
    var tempstr = this.props.getStr();
    this.clear();
    this.frequency(tempstr);
    this.setState({str: tempstr});
  }

  render() {
    return(
      <div>
        <Bar ref={this.chartReference} data={this.data} redraw={true}/>
        <button onClick={this.analyzeEvent}>Analyze</button>
      </div>
    );
  }
}

export default Frequency;