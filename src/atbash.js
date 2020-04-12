import React from 'react';

class Atbash extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = {
      blockNumVisibility: {visibility: "hidden"}, //css attribute
      strAtbash: "", //atbash string output
    };
    //Class Variables
    this.options = {
      translation: props.translation, //values{"encrypt", "decrypt"}
      type: "atbash",
      subType: props.subType, //values{"string", "block"}
      blockNum: 1 //char break number
    };
    this.str = props.str; //values{string variable}

    //Bind Update Methods
    this.methodEvent = this.methodEvent.bind(this);
    this.blockNumEvent = this.blockNumEvent.bind(this);
  }
  
  componentDidMount(){
    this.atbash();
  }

  atbash() { 
    //String atbash
    var localAtbash = [];
    
    if(this.options.subType === "string") 
    {
      localAtbash = this.str;
      const ReversedAlphabet = 'zyxwvutsrqponmlkjihgfedcba'.toUpperCase();
      const alphabet='abcdefghijklmnopqrstuvwxyz'.toUpperCase();
      var strNew = [];

      var len = localAtbash.length;
      var n;
      for(var i =0; i<len; i++)
      {
        
  	     n = alphabet.indexOf(String(localAtbash[i]));
         strNew[i]=ReversedAlphabet[n];
      }
      localAtbash = strNew.join("");    
           
    }
    this.setState({strAtbash: localAtbash});
  }

  methodEvent(event) {
    let eventValue = event.target.value;
    if(eventValue === "encrypt" ||  eventValue === "decrypt")
    {
      this.options.translation = eventValue;
      this.atbash();
    }   
  }

  blockNumEvent(event) {
    let eventValue = event.target.value;
    if(isNaN(parseInt(eventValue))){
      this.options.blockNum = eventValue.toString();
    }
    else{
      this.options.blockNum = parseInt(eventValue, 10);
    }
    this.atbash();
  }

  render() {
    return(
      <div id="atbash">
      <form name="atbashForm">
      <select value={this.options.translation} onChange={this.methodEvent}>
          <option value="encrypt/decrypt">encrypt/decrypt</option>
        </select>
        <select value={this.options.subType} onChange={this.methodEvent}>
          <option value="string">String atbash</option>
        </select>
        <input type="number" id="blockNum" value={this.options.blockNum} onChange={this.blockNumEvent} style={this.state.blockNumVisibility}></input>
      </form>
      <h4 id="atbashEncodeOutput">{this.state.strAtbash}</h4>
      </div>
    );
  }
}

export default Atbash;