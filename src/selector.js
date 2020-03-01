import React from 'react';
import ReverseEncode from './reverse';

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.method = 0;
    this.str = "";
    this.block_num = null;
  }

  inputParseReverse(){
      this.method = parseInt(document.getElementById("ReverseBlock").value, 10);
      this.str = document.getElementById("textarea").value;
      if(this.method === 1){ //block reverse
        this.block_num = document.getElementById("number").value;
      }
  };

  render(){
    if(this.name === "Reverse"){
      return(
        <div>
        <form id="ReverseBlock" value="0">
          <textarea id="textarea"></textarea>
          <button onClick={this.inputParseReverse}>Encode</button>
        </form>
        {<ReverseEncode method={this.method} str={this.str} block_num={this.block_num} />}
        </div>
      );
    }

    else if(this.name === "ReverseBlock"){
      return(
        <div>
        <form id="ReverseBlock" value="1">
          <textarea id="textarea"></textarea>
          <input type="number" id="number"></input>
          <button onClick={this.inputParseReverse}/>
        </form>
        {<ReverseEncode method={this.method} str={this.str} block_num={this.block_num} />}
        </div>
      );
    }
  }
};

export default Selector;

