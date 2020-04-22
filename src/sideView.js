import React from 'react';
import Frequency from './frequency';

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
      </div>
    );
  }
}

export default SideView;