import React from 'react';
import { Bar } from 'react-chartjs-2';

class ADFGVX_FREQ extends React.Component {
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
        labels: ['AA','AD','AF','AG','AV','AX','DA','DD','DF','DG','DV',
        'DX','FA','FD','FF','FG','FV','FX','GA','GD','GF','GG','GV',
        'GX','VA','VD','VF','VG','VV','VX','XA','XD','XF','XG','XV','XX'],
        datasets: [{
        label: "ADFGVX Frequency",
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
    if(this.props.getStr().length>0){

    var tempstr = this.props.getStr();
    this.clear();
    var stringblocks = tempstr.substring(36,tempstr.length);
    stringblocks = stringblocks.match(/.{1,2}/g);
    this.frequency(stringblocks);
    this.setState({str: stringblocks});
    }
  }

  render() {
    return(
      <div>
        <Bar ref={this.chartReference} data={this.data} redraw={true}/>
        <button onClick={this.analyzeEvent}>Analyze ADFGVX</button>
      </div>
    );
  }
}

export default ADFGVX_FREQ;