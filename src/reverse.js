import React from 'react';

class Reverse extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = {
      blockNumVisibility: {visibility: "hidden"}, //css attribute
      strRev: "", //reversed string output
    };
    //Class Variables
    this.options = {
      translation: props.translation, //values{"encrypt", "decrypt"}
      type: "reverse",
      subType: props.subType, //values{"string", "block"}
      blockNum: 1 //char break number
    };
    this.str = props.str; //values{string variable}

    //Bind Update Methods
    this.methodEvent = this.methodEvent.bind(this);
    this.blockNumEvent = this.blockNumEvent.bind(this);
  }
  
  componentDidMount(){
    this.reverse();
  }

  reverse() {
    let localRev = ""; //temp var to hold reversed sting

    //String Reverse
    if(this.options.subType === "string") {
      localRev = this.str.split("").reverse().join("");
    }

    //Block Reverse
    else if(this.options.subType === "block" && (!isNaN(this.options.blockNum) && this.options.blockNum > 0)){
      let arrStr = [];
      let itterations = Math.ceil((this.str.length/this.options.blockNum));
      for (let i = 0, j = 0; i < itterations; i++, j+=this.options.blockNum) {
        arrStr.push(this.str.substring(j, (j + this.options.blockNum)));
      }
      arrStr.forEach(function(element){
        localRev = localRev.concat(element.split("").reverse().join(""), " ");
      });
    }

    this.setState({strRev: localRev});
  }

  methodEvent(event) {
    let eventValue = event.target.value;
    if(eventValue === "encrypt" || eventValue === "decrypt"){
      this.options.translation = eventValue;
    }
    else{
      if(eventValue === "string"){
        this.options.subType = eventValue;
        this.setState({blockNumVisibility: {visibility: "hidden"}});
      }
      else if(eventValue === "block"){
        this.options.subType = eventValue;
        this.setState({blockNumVisibility: {visibility: "visible"}});
      }
    }
    this.reverse();
  }

  blockNumEvent(event) {
    let eventValue = event.target.value;
    if(isNaN(parseInt(eventValue))){
      this.options.blockNum = eventValue.toString();
    }
    else{
      this.options.blockNum = parseInt(eventValue, 10);
    }
    this.reverse();
  }

  render() {
    return(
      <div id="reverse">
      <form name="reverseForm">
      <select value={this.options.translation} onChange={this.methodEvent}>
          <option value="encrypt">Encrypt</option>
          <option value="decrypt">Decrypt</option>
        </select>
        <select value={this.options.subType} onChange={this.methodEvent}>
          <option value="string">String Reverse</option>
          <option value="block">Block Reverse</option>
        </select>
        <input type="number" id="blockNum" value={this.options.blockNum} onChange={this.blockNumEvent} style={this.state.blockNumVisibility}></input>
      </form>
      <h4 id="reverseEncodeOutput">{this.state.strRev}</h4>
      </div>
    );
  }
}

export default Reverse;