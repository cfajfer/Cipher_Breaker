import React from 'react';

class Trifid extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = {
      blockNumVisibility: {visibility: "hidden"}, //css attribute
      strtrifid: "", //trifid string output
    };
    //Class Variables
    this.options = {
      translation: props.translation, //values{"encrypt", "decrypt"}
      type: "trifid",
      subType: props.subType, //values{"string", "block"}
      blockNum: 1 //char break number
    };
    this.str = props.str; //values{string variable}

    //Bind Update Methods
    this.methodEvent = this.methodEvent.bind(this);
    this.blockNumEvent = this.blockNumEvent.bind(this);
  }
  
  componentDidMount(){
    this.trifid();
  }
  
  
  trifid() { 
    if(this.options.subType === "string" && this.str.length>0) 
    {
   
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.";
var block_one;
var block_two;
var block_three;

//shuffle function

var arr = alphabet.split('');        //split to array
var n = arr.length;              //get length
for(var i=0 ; i<n-1 ; i++) 
{
  var j = Math.floor(Math.random()*n);    //pick random integer within the domain of the length       
  var temp = arr[i];             //swap is preformed to randomize these characters so the key isn't constant
  arr[i] = arr[j];
  arr[j] = temp;
}
alphabet = arr.join('');   //convert key to string

//splitting text into blocks
block_one = alphabet.substring(0,9).split("");
block_two = alphabet.substring(9,18).split("");
block_three = alphabet.substring(18,27).split("");

var index = "";
var block;
var row;
var col;
var word = this.str;
var period = 5;
var rows="";
var cols="";
var blocks="";
for(let x = 0; x<word.length;x++)
{
if( block_one.indexOf(word[x]) != -1)
{
  block =0;
  row = col = null;
  row = col = block_one.indexOf(word[x]);
  col = col%3;
  row = Math.floor(row/3);
}
if( block_two.indexOf(word[x]) != -1)
{
  block = 1;
  row = col = null;
  row = col = block_two.indexOf(word[x]);
  col = col%3;
  row = Math.floor(row/3);
}
if(block_three.indexOf(word[x]) != -1)
{
  block = 2;
  row = col = null;
  row = col = block_three.indexOf(word[x]);
  col = col%3;
  row = Math.floor(row/3);
}
blocks = blocks +""+block;
rows = rows +""+ row;
cols = cols+""+ col;
index = index+ (block+""+row+""+col);
}
var chopblocks = chunkString(blocks, period);
var choprows = chunkString(rows, period);
var chopcols = chunkString(cols, period);


//this is where we concat everything together the blocks 
//rows and columns however they were first split into by 
//the period then this will put them all together for 
//translation
var combination="";
for(let x =0; x<chopblocks.length; x++)
{
  combination = combination +""+ chopblocks[x] +""+choprows[x] +""+chopcols[x];
}

combination = chunkString(combination,3);

var newPosition;
var newRow=0;
var newCol=0;  

var ciphertext="";
for(let x = 0; x<combination.length;x++)
{
newPosition = combination[x];
if(newPosition[0]==0)
{
  newRow = parseInt(newPosition[1]);
  newCol = parseInt(newPosition[2]);
  ciphertext =ciphertext + block_one[3*newRow+newCol];

}
if(newPosition[0]==1)
{

  newRow = parseInt(newPosition[1]);
  newCol = parseInt(newPosition[2]);
  ciphertext =ciphertext + block_two[3*newRow+newCol];
}
if(newPosition[0]==2)
{
  newRow = parseInt(newPosition[1]);
  newCol = parseInt(newPosition[2]);
  ciphertext = ciphertext + block_three[3*newRow+newCol];
  
}
}
    ciphertext = ciphertext;
    }         
    var keyciphertext = alphabet + ciphertext;
    this.setState({strtrifid: keyciphertext});
  }
  decrpyt()
  {
    var input = this.str;
    //code to decipher the text
var blocks = "";
var rows = "";
var cols = "";
var index = "";
var row = "";
var col = "";
var period = 5;
var block ="";
var newCol;
var newRow;
var newPosition;
var block_one = input.substring(0,9);
var block_two = input.substring(9,18);
var block_three = input.substring(18,27);
var ciphertext = input.substring(27,input.length);
for(let x=0;x<ciphertext.length;x++)
{
  if( block_one.indexOf(ciphertext[x]) != -1)
{
  block =0;
  row = col = null;
  row = col = block_one.indexOf(ciphertext[x]);
  col = col%3;
  row = Math.floor(row/3);
}
if( block_two.indexOf(ciphertext[x]) != -1)
{
  block = 1;
  row = col = null;
  row = col = block_two.indexOf(ciphertext[x]);
  col = col%3;
  row = Math.floor(row/3);
}
if(block_three.indexOf(ciphertext[x]) != -1)
{
  block = 2;
  row = col = null;
  row = col = block_three.indexOf(ciphertext[x]);
  col = col%3;
  row = Math.floor(row/3);
}
blocks = blocks +""+block;
rows = rows +""+ row;
cols = cols+""+ col;
index = index+ (block+""+row+""+col);
}
var plaintext="";
blocks = blocks.split("");
rows = rows.split("");
cols = cols.split("");
for(let x = 0; x<blocks.length; x++)
{
  plaintext = plaintext + blocks[x]+rows[x]+cols[x];
}
var chopText = chunkString(plaintext, period);
var y=0;
var z=0;
var w =0;
blocks = [];
rows =[];
cols = [];
for(let x = 0; x<chopText.length; x++)
{
  if(x%3==0)
  {
    blocks[y] = chopText[x];
    y++
  }
  if(x%3==1)
  {
    rows[z] = chopText[x];
    z++
  }
  if(x%3==2)
  {
    cols[w] = chopText[x];
    w++
  }

}

blocks= blocks.join("");
rows = rows.join("");
cols = cols.join("");
var indexPlaintext="";
for(let x =0; x<blocks.length;x++)
{
  indexPlaintext = indexPlaintext +""+ blocks[x]+""+rows[x]+""+cols[x];
}
indexPlaintext = chunkString(indexPlaintext,3);
console.log(indexPlaintext);
var final = "";
newRow = "";
newCol = "";
newPosition = "";
for(let x = 0; x<indexPlaintext.length;x++)
{
newPosition = indexPlaintext[x];
if(newPosition[0]==0)
{
  newRow = parseInt(newPosition[1]);
  newCol = parseInt(newPosition[2]);
  final =final + block_one[3*newRow+newCol];
}
if(newPosition[0]==1)
{
  newRow = parseInt(newPosition[1]);
  newCol = parseInt(newPosition[2]);
  final =final + block_two[3*newRow+newCol];
}
if(newPosition[0]==2)
{
  newRow = parseInt(newPosition[1]);
  newCol = parseInt(newPosition[2]);
  final = final + block_three[3*newRow+newCol]; 
}
}

this.setState({strtrifid: final});


  }
  methodEvent(event) {
    let eventValue = event.target.value;
    if(eventValue === "encrypt")
    {
      this.options.translation = eventValue;
      this.trifid();
    } 
    if(eventValue === "decrypt")
    {
      this.options.translation = eventValue;
      this.decrpyt();
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
    this.trifid();
  }

  render() {
    return(
      <div id="trifid">
      <form name="trifidForm">
      <select value={this.options.translation} onChange={this.methodEvent}>
          <option value="encrypt">encrypt</option>
          <option value="decrypt">decrypt</option>

        </select>
        <select value={this.options.subType} onChange={this.methodEvent}>
          <option value="string">String Trifid</option>
        </select>
        <input type="number" id="blockNum" value={this.options.blockNum} onChange={this.blockNumEvent} style={this.state.blockNumVisibility}></input>
      </form>
      <h4 id="trifidEncodeOutput">{this.state.strtrifid}</h4>
      </div>
    );
  }
}
function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
export default Trifid;