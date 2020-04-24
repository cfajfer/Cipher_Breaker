import React from 'react';

class Bifid extends React.Component {
 constructor(props) {
    super(props);
    //Construct States
    this.state = {
      blockNumVisibility: {visibility: "hidden"}, //css attribute
      strBifid: "", //reversed string output
    };
    //Class Variables
    this.options = {
      translation: props.translation, //values{"encrypt", "decrypt"}
      type: "bifid",
      subType: props.subType, //values{"string", "block"}
      blockNum: 1 //char break number
    };
    this.str = props.str; //values{string variable}
    //Bind Update Methods
	this.array=[["P","H","U","G","M"],
	            ["E","A","Y","L","N"],
				["O","F","D","X","K"],
				["R","C","V","S","Z"],
				["W","B","J","T","I"]];
	this.columns=[];
	this.rows=[];
	this.finalarray=[];
	this.decryptarray=[];
    this.methodEvent = this.methodEvent.bind(this);
    this.blockNumEvent = this.blockNumEvent.bind(this);
  }
  
  componentDidMount(){
    this.bifid();
  }
  
  bifid() {
	var localBifid="";
	var keepGoing=1;
	//encrypt method
	//empty arrays
	this.columns=[];
	this.rows=[];
	this.finalarray=[];
	this.decryptarray=[];
	if(this.options.translation==="encrypt") {
		for(var i=0;i<this.str.length;i++){
			var temp=this.str.charAt(i);
			if(temp==="Q"){
				temp="U";
			}
			for(var j=0;j<5;j++){
				for(var k=0;k<5;k++) {
					if(this.array[j][k]===temp) {
						this.rows.push(j);
						this.columns.push(k);
					}
				}
			}
		}
		while(keepGoing) {
			for(var l=0;l<=this.str.length;l+=5) {
				if(l>=this.str.length) {
					keepGoing=0;
					break;
				}
				this.finalarray.push(this.rows[l]);
				var col0=this.columns[l];
				if((l+1)>=this.str.length) {
					this.finalarray.push(col0);
					keepGoing=0;
					break;
				}
				this.finalarray.push(this.rows[l+1]);
				var col1=this.columns[l+1];
				if((l+2)>=this.str.length) {
					this.finalarray.push(col0);
					this.finalarray.push(col1);
					keepGoing=0;
					break;
				}
				this.finalarray.push(this.rows[l+2]);
				var col2=this.columns[l+2];
				if((l+3)>=this.str.length) {
					this.finalarray.push(col0);
					this.finalarray.push(col1);
					this.finalarray.push(col2);
					keepGoing=0;
					break;
				}
				this.finalarray.push(this.rows[l+3]);
				var col3=this.columns[l+3];
				if((l+4)>=this.str.length) {
					this.finalarray.push(col0);
					this.finalarray.push(col1);
					this.finalarray.push(col2);
					this.finalarray.push(col3);
					keepGoing=0;
					break;
					
				}
				this.finalarray.push(this.rows[l+4]);
				var col4=this.columns[l+4];
				this.finalarray.push(col0);
				this.finalarray.push(col1);
				this.finalarray.push(col2);
				this.finalarray.push(col3);
				this.finalarray.push(col4);
				keepGoing=1;
			}
		}
		for(var x=0;x<this.finalarray.length;x+=2) {
			var y=x+1;
			var temp1=this.finalarray[x];
			var temp2=this.finalarray[y];
			localBifid=localBifid+this.array[temp1][temp2];
		}
		this.setState({strBifid: localBifid});
	}
	//decrypt
	else {
		this.columns=[];
		this.rows=[];
		this.finalarray=[];
		this.decryptarray=[];
		for(i=0;i<this.str.length;i++){
			temp=this.str.charAt(i);
			for(j=0;j<5;j++){
				for(k=0;k<5;k++) {
					if(this.array[j][k]===temp) {
						this.decryptarray.push(j);
						this.decryptarray.push(k);
					}
				}
			}
		}
		var middle=this.decryptarray.length/2;
		if(middle>5)
		{
			if(middle%5===0) {
			
			}
				
		}
		else
		{
			var column2=this.decryptarray;
			var row2=column2.splice(0, Math.ceil(middle));
			for(k=0;k<column2.length;k++) {
				var rownum=row2[k];
				var colnum=column2[k];
				localBifid=localBifid+this.array[rownum][colnum];
			}
		}
		this.setState({strBifid: localBifid});
	}
  }
  
  methodEvent(event) {
    let eventValue = event.target.value;
    if(eventValue === "encrypt")
    {
      this.options.translation = eventValue;
      this.bifid();
    }  
    if(eventValue === "decrypt")
    {
      this.options.translation = eventValue;
      this.bifid();
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
    this.bifid();
  }
  
  render() {
    return(
      <div id="bifid">
      <form name="bifidForm">
      <select value={this.options.translation} onChange={this.methodEvent}>
          <option value="encrypt">encrypt</option>
          <option value="decrypt">decrypt</option>
        </select>
        <input type="number" id="blockNum" value={this.options.blockNum} onChange={this.blockNumEvent} style={this.state.blockNumVisibility}></input>
      </form>
      <h4 id="bifidEncodeOutput">{this.state.strBifid}</h4>
      </div>
    );
  }
}

export default Bifid;
