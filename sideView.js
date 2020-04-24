import React from 'react';
import Frequency from './frequency';
import ADFGVX_FREQ from './ADFGVXTool'
import ADFGVXReplacementTool from './ADFGVXReplacement';
class SideView extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = { 

    };
    //Bind Update Methods
    this.getStr = this.getStr.bind(this);
  }

  getStr(){
    return this.props.getStr();
  }

  render() {
    return(
      <div>
        <Frequency getStr={this.getStr}/>
        <ADFGVX_FREQ getStr={this.getStr}/>
      </div>
    );
  }
}

export default SideView;