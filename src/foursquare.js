import React from 'react';

class Foursquare extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = {
      blockNumVisibility: {visibility: "hidden"}, //css attribute
      strFour: "", //reversed string output
    };
    //Class Variables
    this.options = {
      translation: props.translation, //values{"encrypt", "decrypt"}
      type: "foursquare",
      subType: props.subType, //values{"string", "block"}
      blockNum: 1 //char break number
    };
    this.str = props.str; //values{string variable}
	this.normal=["a", "b", "c", "d", "e",
				 "f", "g", "h", "i", "j",
				 "k", "l", "m", "n", "o",
				 "p", "r", "s", "t", "u",
				 "v", "w", "x", "y", "z" ];
	this.cipher1=["z", "g", "p", "t", "f",
			  "o", "i", "h", "m", "u",
			  "w", "d", "r", "c", "n",
			  "y", "k", "e", "j", "a",
			  "x", "v", "s", "b", "l"];
	this.cipher2=["m", "f", "n", "b", "d",
			  "c", "r", "h", "s", "a",
			  "x", "y", "o", "g", "v",
			  "i", "t", "u", "e", "w",
			  "l", "j", "z", "k", "p"];
	//looping variables
	this.i=0;
	this.j=this.i+1;
    //Bind Update Methods
    this.methodEvent = this.methodEvent.bind(this);
    this.blockNumEvent = this.blockNumEvent.bind(this);
  }
  
   componentDidMount(){
    this.foursquare();
  }
  
  foursquare() {
	  var localFour="";
	  var first="";
	  var second="";
	  var temp1="";
	  var temp2="";
	  var temp3="";
	  var temp4="";
	  var temp5="";
	  var temp6="";
	  //quicker to do this than retype all arrays to uppercase.
	  this.str=this.str.toLowerCase();
	  if(this.options.translation==="encrypt") {
		  for(this.i=0; this.i<this.str.length;this.i+=2) {
			  this.j=this.i+1;
			  //check if i is the last letter of the word, this
			  //only needing to do one of the translations
			  if(this.i===this.str.length-1) {
				  first=this.str.charAt(this.i);
				  if(first==="q"){
					  first="u";
				  }
				  temp1=this.normal.indexOf(first);
				  temp2=this.cipher1[temp1];
				  localFour=localFour+temp2;
			  }
			  else{
				  var first1=this.str.charAt(this.i);
				  if(first1==="q"){
					  first1="u";
				  }
				  second=this.str.charAt(this.j);
				  if(second==="q"){
					  second="u";
				  }
			  temp3=this.normal.indexOf(first1);
			  temp4=this.cipher1[temp3];
			  temp5=this.normal.indexOf(second);
			  temp6=this.cipher2[temp5];
			  localFour=localFour+temp4+temp6;
			  }
		  }
	  }
	  //decrypt
	  else {
		  for(this.i=0; this.i<this.str.length;this.i+=2) {
			  this.j=this.i+1;
			  //check if i is the last letter of the word, this
			  //only needing to do one of the translations
			  if(this.i===this.str.length) {
				  first=this.str.charAt(this.i);
				  if(first==="q"){
					  first="u";
				  }
				  temp1=this.cipher1.indexOf(first);
				  temp2=this.normal[temp1];
				  localFour=localFour+temp2;
			  }
			  else{
				  first1=this.str.charAt(this.i);
				  if(first1==="q"){
					  first1="u";
				  }
				  second=this.str.charAt(this.j);
				  if(second==="q"){
					  second="u";
				  }
			  temp3=this.cipher1.indexOf(first1);
			  temp4=this.normal[temp3];
			  temp5=this.cipher2.indexOf(second);
			  temp6=this.normal[temp5];
			  localFour=localFour+temp4+temp6;
			  }
		  }
	  }
	this.setState({strFour: localFour});
	  }
	 
	
	methodEvent(event) {
      let eventValue = event.target.value;
      if(eventValue === "encrypt"){
        this.options.translation = eventValue;
	    this.foursquare();
      }
      if(eventValue === "decrypt")
	  {
		this.options.translation = eventValue;
		this.foursquare();
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
    this.foursquare();
  }

  render() {
    return(
      <div id="foursquare">
      <form name="foursquareForm">
      <select value={this.options.translation} onChange={this.methodEvent}>
          <option value="encrypt">Encrypt</option>
          <option value="decrypt">Decrypt</option>
        </select>
        <input type="number" id="blockNum" value={this.options.blockNum} onChange={this.blockNumEvent} style={this.state.blockNumVisibility}></input>
      </form>
      <h4 id="foursquareEncodeOutput">{this.state.strFour}</h4>
      </div>
    );
  }
}

export default Foursquare;
