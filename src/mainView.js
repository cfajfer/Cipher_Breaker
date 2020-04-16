import React from 'react';
import Reverse from './reverse';
import Atbash from './atbash';
import FourSquare from './foursquare';
import ADFGVX from './ADFGVX';
import BIFID from './bifid';
import Trifid from './Trifid';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = { 
      active: {
        current: "menu",
        menu: true,
        reverse: false,
      },
      str: ""
    };
    this.input = "";
    //Bind Update Methods
    this.textareaEvent = this.textareaEvent.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.inputSanatize = this.inputSanatize.bind(this);
  }

  textareaEvent(event) {
    this.input = event.target.value
    this.inputSanatize();
  }

  inputSanatize(){ //Produces UpperCase string w/ no whitespace
    var cleanStr = this.input;
    cleanStr = cleanStr.trim();
    cleanStr = cleanStr.toUpperCase();
    cleanStr = cleanStr.replace(/\s+/g, '');
    this.setState({str: cleanStr}, this.props.callBackStr(cleanStr));
  }

  toggleView(menu, component){
    switch(component){
      case "reverseEncrypt":
        this.setState(prevState => ({
          active: {
          ...prevState.active,
          current: "reverseEncrypt",
          menu: !this.state.active.menu,
          reverse: !this.state.active.reverse,
          }
        }));
        
        break;
      /*atbash add Dylan Pettijohn*/
      case "atbashEncrypt":
        this.setState(prevState => ({
          active: {
          ...prevState.active,
          current: "atbashEncrypt",
          menu: !this.state.active.menu,
          atbash: !this.state.active.atbash,
          }
  
        }));
        break;
        /* add ADFGVX Dylan Pettijohn*/
      case "ADFGVXEncrypt":
        this.setState(prevState => ({
          active: {
          ...prevState.active,
          current: "ADFGVXEncrypt",
          menu: !this.state.active.menu,
          ADFGVX: !this.state.active.ADFGVX,
          }
  
        }));
        break;
	  //Four Square add Jeremy Morgan
	   case "foursquareEncrypt":
        this.setState(prevState => ({
          active: {
          ...prevState.active,
          current: "foursquareEncrypt",
          menu: !this.state.active.menu,
          foursquare: !this.state.active.foursquare,
          }
        }));
		break;
		//Bifid add Jeremy Morgan
	   case "bifidEncrypt":
        this.setState(prevState => ({
          active: {
          ...prevState.active,
          current: "bifidEncrypt",
          menu: !this.state.active.menu,
          bifid: !this.state.active.bifid,
          }
        }));
        break;
      /* add Trifid Dylan Pettijohn*/
      case "TrifidEncrypt":
        this.setState(prevState => ({
          active: {
          ...prevState.active,
          current: "TrifidEncrypt",
          menu: !this.state.active.menu,
          Trifid: !this.state.active.Trifid,
          }
  
        }));
        break;
      default:
        break;
    }
    if(menu === true){
      this.setState(prevState => ({
        active: {
        ...prevState.active,
        current: "menu"
        }
      }));
    }
  }

  render() {
    if(this.state.active.menu === true){
      return(
        <div>
          <textarea value={this.input} onChange={this.textareaEvent} id="mainInput"></textarea>
          <br/>
          {/* Cryptography Toggles Go Here */}

          <button type="button" onClick={() => this.toggleView(false, "reverseEncrypt")}>Reverse Encrypt Toggle</button>
        
        {/*Add of Atbash Toggle Dylan Pettijohn*/}

        <button type="button" onClick={() => this.toggleView(false, "atbashEncrypt")}>Atbash Encrypt Toggle</button>
		 {/*Add of ADFGVX Toggle Dylan Pettijohn*/}

     <button type="button" onClick={() => this.toggleView(false, "ADFGVXEncrypt")}>ADFGVX Encrypt Toggle</button>
		
		{/*Add of Four Square Toggle Jeremy Morgan*/}
		
		<button type="button" onClick={() => this.toggleView(false, "foursquareEncrypt")}>Four Sqaure Encrypt Toggle</button>
		
		{/*Add of Bifid Toggle Jeremy Morgan*/}
		
		<button type="button" onClick={() => this.toggleView(false, "bifidEncrypt")}>Bifid Encrypt Toggle</button>

    {/*Add of Trifid Toggle Jeremy Morgan*/}
		
		<button type="button" onClick={() => this.toggleView(false, "TrifidEncrypt")}>Trifid Encrypt Toggle</button>

          {/* END */}
        </div>
      );
    }
    else if(this.state.active.menu === false){
      return(
        <div>
          <button className="close" onClick={() => this.toggleView(true, this.state.active.current)}></button>
          <textarea value={this.input} onChange={this.textareaEvent} id="mainInput" readOnly></textarea>
          {/* Cryptography Components Go Here */}
          {this.state.active.reverse && <Reverse translation="encrypt" subType="string" str={this.state.str}/>}
          
          {/*Add of Atbash Component Dylan pettijohn*/}
          {this.state.active.atbash && <Atbash translation="encrypt" subType="string" str={this.state.str}/>}
          
          {/*Add of ADFGVX Component Dylan pettijohn*/}
          {this.state.active.ADFGVX && <ADFGVX translation="encrypt" subType="string" str={this.state.str}/>}

	      {/*Add of Four Square Component Jeremy Morgan*/}
		  {this.state.active.foursquare && <FourSquare translation="encrypt" subType="string" str={this.state.str}/>}
		  
		  {/*Add of Four Square Component Jeremy Morgan*/}
		  {this.state.active.bifid && <BIFID translation="encrypt" subType="string" str={this.state.str}/>}
      {/*Add of Four Square Component Jeremy Morgan*/}
		  {this.state.active.Trifid && <Trifid translation="encrypt" subType="string" str={this.state.str}/>} 
          {/* END */}

        </div>
      );
    }
  }
}

export default MainView;