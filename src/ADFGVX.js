import React from 'react';

class ADFGVX extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = {
      blockNumVisibility: {visibility: "hidden"}, //css attribute
      straDFGVX: "", //aDFGVX string output
    };
    //Class Variables
    this.options = {
      translation: props.translation, //values{"encrypt", "decrypt"}
      type: "aDFGVX",
      subType: props.subType, //values{"string", "block"}
      blockNum: 1 //char break number
    };
    this.str = props.str; //values{string variable}

    //Bind Update Methods
    this.methodEvent = this.methodEvent.bind(this);
    this.blockNumEvent = this.blockNumEvent.bind(this);
  }
  
  componentDidMount(){
    this.aDFGVX();
  }

  aDFGVX() { 
    //String aDFGVX
    var localaDFGVX = [];
    
    if(this.options.subType === "string") 
    {
      localaDFGVX = this.str;
      var polyB =[36];
      polyB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" //for simplicity I used a 1x36 array instead of a 6x6 2D array
      var arr = polyB.split('');        //split to array
      var n = arr.length;              //get length
      for(var i=0 ; i<n-1 ; i++) 
      {
        var j = Math.floor(Math.random()*n);    //pick random integer within the domain of the length       
        var temp = arr[i];             //swap is preformed to randomize these characters so the key isn't constant
        arr[i] = arr[j];
        arr[j] = temp;
      }
      polyB = arr.join('');   //convert key to string
      var cipher = "ADFGVX"; //cipher characters
      var x;
      var y;
      var newWord = "";
      for(let i = 0; i<localaDFGVX.length; i++) // converting message to cipher key format
      {
	    n = polyB.indexOf(localaDFGVX[i]);
      x = Math.floor(n/6);
      y = n%6;
    
	    newWord = newWord + cipher[x] + cipher[y];
      }
      localaDFGVX=polyB+newWord;   //concat cipher key and message together 
    }
    this.setState({straDFGVX: localaDFGVX}); //output
  }
  Decrypt()
  {
    var input = this.str; //take in polyB key and message
    var cipher = "ADFGVX";
    var x;
    var y;
    var polyB;
    var Transcription ="";
    var word;
    polyB = input.substring(0,36); //split key and message up
    word = input.substring(36,input.length);
    for(let q = 0; word.length>q; q = q+2) //use key, cipher, and message to pull out the original text
    {
        x = cipher.indexOf(word[q]);
        y = cipher.indexOf(word[q+1]);
        Transcription = Transcription+ polyB[6*x+y];
    }
    var output=Transcription;


    this.setState({straDFGVX:output}); 

  }
  methodEvent(event) {
    let eventValue = event.target.value;
    if(eventValue === "encrypt" ||  eventValue === "decrypt")
    {
      this.options.translation = eventValue;
      this.aDFGVX();
    }  
    if(eventValue === "decrypt")
    {
      this.options.translation = eventValue;
      this.Decrypt();
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
    this.Decrypt();
  }

  render() {
    return(
      <div id="aDFGVX">
      <form name="aDFGVXForm">
      <select value={this.options.translation} onChange={this.methodEvent}>
          <option value="encrypt">encrypt</option>
          <option value="decrypt">decrypt</option>
        </select>
        <select value={this.options.subType} onChange={this.methodEvent}>
          <option value="string">String aDFGVX</option>
        </select>
        <input type="number" id="blockNum" value={this.options.blockNum} onChange={this.blockNumEvent} style={this.state.blockNumVisibility}></input>
      </form>
      <h4 id="aDFGVXEncodeOutput">{this.state.straDFGVX}</h4>
      </div>
    );
  }
}

export default ADFGVX;