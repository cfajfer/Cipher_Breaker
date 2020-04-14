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

    //Bind Update Methods
    this.methodEvent = this.methodEvent.bind(this);
    this.blockNumEvent = this.blockNumEvent.bind(this);
  }
  
  componentDidMount(){
    this.foursquare();
  }

  foursquare() {
	  //Need to get the entey box to re appear
	 if(this.options.subType==="string") { 
	var normal=["a", "b", "c", "d", "e",
			"f", "g", "h", "i", "j",
			"k", "l", "m", "n", "o",
			 "p", "r", "s", "t", "u",
			 "v", "w", "x", "y", "z" ];
	var cipher1=["z", "g", "p", "t", "f",
			  "o", "i", "h", "m", "u",
			  "w", "d", "r", "c", "n",
			  "y", "k", "e", "j", "a",
			  "x", "v", "s", "b", "l"];
	var cipher2=["m", "f", "n", "b", "d",
			  "c", "r", "h", "s", "a",
			  "x", "y", "o", "g", "v",
			  "i", "t", "u", "e", "w",
			  "l", "j", "z", "k", "p"];
    var x;
	var localFour="";
	var string4="";
	this.str=this.str.toLowerCase();
		for(x=0; x<this.str.length; x+=2) {
			//get rid of spaces
			this.str=this.str.replace(/ /g, "");
			var y=x+1
			//check if message has odd length
			if(y===this.str.length) {
				var first;
				var temp1;
				var temp2;
				first=this.str.charAt(x);
				if(first==="q") {
					first="u";
				}
				temp1=normal.indexOf(first);
				temp2=cipher1[temp1];
				string4=string4+temp2;
				
			}
			else {
				var first1;
				var second;
				var temp3;
				var temp4;
				var temp5;
				var temp6;
				first1=this.str.charAt(x);
				if(first1==="q") {
					first1="u";
				}
				second=this.str.charAt(y);
				if(second==="q") {
					second="u";
				}
				temp3=normal.indexOf(first1);
				temp4=cipher1[temp3];
				temp5=normal.indexOf(second);
				temp6=cipher2[temp5];
				console.log(temp4);
				console.log(temp6);
				string4=string4+temp4+temp6;
				console.log(string4);
			}
			this.setState({strFour: string4});
		}
	 }
  }
  
  Decrypt()
  {
	  console.log("HI");
	  this.str=this.str.toLowerCase();
	  console.log(this.str);
	  var undo=this.str;
	  var normal=["a", "b", "c", "d", "e",
		     "f", "g", "h", "i", "j",
			 "k", "l", "m", "n", "o",
			 "p", "r", "s", "t", "u",
			 "v", "w", "x", "y", "z" ];
	  var cipher1=["z", "g", "p", "t", "f",
			  "o", "i", "h", "m", "u",
			  "w", "d", "r", "c", "n",
			  "y", "k", "e", "j", "a",
			  "x", "v", "s", "b", "l"];
	  var cipher2=["m", "f", "n", "b", "d",
			  "c", "r", "h", "s", "a",
			  "x", "y", "o", "g", "v",
			  "i", "t", "u", "e", "w",
			  "l", "j", "z", "k", "p"];
	  var string4="";
	  var x;
	  for(x=0; x<undo.length; x+=2) {
			//get rid of spaces
			undo=undo.replace(/ /g, "");
			var y=x+1
			//check if message has odd length
			if(y===undo.length) {
				var first;
				var temp1;
				var temp2;
				first=undo.charAt(x);
				if(first==="q") {
					first="u";
				}
				temp1=cipher1.indexOf(first);
				temp2=normal[temp1];
				string4=string4+temp2;
				
			}
			else {
				var first1;
				var second;
				var temp3;
				var temp4;
				var temp5;
				var temp6;
				first1=undo.charAt(x);
				console.log(first1);
				if(first1==="q") {
					first1="u";
				}
				second=undo.charAt(y);
				console.log(second);
				if(second==="q") {
					second="u";
				}
				temp3=cipher1.indexOf(first1);
				temp4=normal[temp3];
				temp5=cipher2.indexOf(second);
				temp6=normal[temp5];
				string4=string4+temp4+temp6;
				console.log(string4);
			}
			this.setState({strFour: string4});
	  }
  }
  

 

  methodEvent(event) {
    let eventValue = event.target.value;
	console.log(eventValue);
    if(eventValue === "encrypt"){
      this.options.translation = eventValue;
	  this.foursquare();
    }
    if(eventValue === "decrypt")
	{
		console.log("HI");
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
      <div id="foursquare">
      <form name="foursquareForm">
      <select value={this.options.translation} onChange={this.methodEvent}>
          <option value="encrypt">Encrypt</option>
          <option value="decrypt">Decrypt</option>
        </select>
        <select value={this.options.subType} onChange={this.methodEvent}>
          <option value="string">String Foursquare</option>
        </select>
        <input type="number" id="blockNum" value={this.options.blockNum} onChange={this.blockNumEvent} style={this.state.blockNumVisibility}></input>
      </form>
      <h4 id="foursquareEncodeOutput">{this.state.strFour}</h4>
      </div>
    );
  }
}

export default Foursquare;