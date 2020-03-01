import React from 'react';

class ReverseEncode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: 0,
      str: "",
      blockNum: 0
    };
    this.strRev = "";
    this.textareaEvent = this.textareaEvent.bind(this);
    this.methodEvent = this.methodEvent.bind(this);
    this.blockNumEvent = this.blockNumEvent.bind(this);
  }
  
  reverse(props) {
    if(this.state.method === 0) { //string reverse
      this.strRev = this.state.str.split("").reverse().join("");
    }
    else if(this.state.method === 1){ //block reverse
      var arrStr = [];
      for (var i = 0, charsLength = this.state.str.length; i < charsLength; i += 3) {
        arrStr.push(this.state.str.substring(i, i + 3));
      }
      arrStr.forEach(element => {
        this.strRev.concat(element.split("").reverse().join(""));
      })
    }
    document.getElementById("reverseEncodeOutput").textContent = this.strRev;
  }

  textareaEvent(event) {
    this.setState({str: event.target.value});
    this.reverse();
  }
  methodEvent(event) {
    this.setState({method: parseInt(event.target.value, 10)});
    if(this.state.method === 0){
      document.getElementById("blockNum").style.visibility = "hidden";
    }
    else if(this.state.method === 1){
      document.getElementById("blockNum").style.visibility = "visible";
    }
    this.reverse();
  }
  blockNumEvent(event) {
    this.setState({blockNum: event.target.value});
    this.reverse();
  }

  render() {
    if(this.state.method === 0 || this.state.method === 1){
      return(
        <div id="reverse">
        <form name="reverseForm">
          <textarea value={this.state.str} onChange={this.textareaEvent}></textarea>
          <select value={this.state.method} onChange={this.methodEvent}>
            <option value="0">String</option>
            <option value="1">Block</option>
          </select>
          <input type="number" id="blockNum" value={this.state.blockNum} onChange={this.blockNumEvent} style={{visibility: "hidden"}}></input>
        </form>
        <h4 id="reverseEncodeOutput"></h4>
        </div>
      );
    }
  }
}

export default ReverseEncode;

// class Reverse_Decode extends React.Component {

// }
