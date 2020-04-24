import React from 'react';

class IsAtbashOrRev extends React.Component {
constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { 
        str:"",
        ciphers: [
            {id: 1, name: 'Atbash', Translation: ""},
            {id: 2, name: 'Reverse', Translation: ""},
         ],  
      }
          //Bind Update Methods
    this.AtbashReverse = this.AtbashReverse.bind(this); 
   }
   CreateTable() {
    return this.state.ciphers.map((cipher, index) => {
       const {id, name, Translation} = cipher 
       return (
          <tr key={id}>
             <td>Cipher Type: {name}</td>
             <td>Plaintext: {Translation}</td>
          </tr>
       )
    })
 }

 AtbashReverse(){
        var tempstr = this.props.getStr();
        var myTable = document.getElementById('ciphers');
        var localAtbash = tempstr;
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
        myTable.rows[0].cells[1].innerHTML = "Plaintext: " + localAtbash;
        myTable.rows[1].cells[1].innerHTML = "Plaintext: " + tempstr.split("").reverse().join("");
      }

 render() {
    return (
       <div>
          <h1 id='title'>Atbash & Reverse Ciphers</h1>
          <table id='ciphers'>
             <tbody>
                {this.CreateTable()}
             </tbody>
          </table>
          <h4 id="output">{this.state.str}</h4>
          <button onClick={this.AtbashReverse}>Reverse/Atbash Analysis</button>
          
       </div>
    )
 }
}

export default IsAtbashOrRev;