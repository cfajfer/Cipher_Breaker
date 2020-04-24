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
        atbash: false,
        ADFGVX: false,
        foursquare: false,
        bifid: false,
        trifid: false,
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

      case "TrifidEncrypt":
        this.setState(prevState => ({
          active: {
          ...prevState.active,
          current: "TrifidEncrypt",
          menu: !this.state.active.menu,
          trifid: !this.state.active.trifid,
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
          <button type="button" className="button seperator" onClick={() => this.toggleView(false, "reverseEncrypt")}>Reverse Cipher</button>
          <button type="button" className="button seperator" onClick={() => this.toggleView(false, "atbashEncrypt")}>Atbash Cipher</button>
          <button type="button" className="button seperator" onClick={() => this.toggleView(false, "ADFGVXEncrypt")}>ADFGVX Cipher</button>
          <br/>
		      <button type="button" className="button seperator" onClick={() => this.toggleView(false, "foursquareEncrypt")}>Four Square Cipher</button>
		      <button type="button" className="button seperator" onClick={() => this.toggleView(false, "bifidEncrypt")}>Bifid Cipher</button>
		      <button type="button" className="button seperator" onClick={() => this.toggleView(false, "TrifidEncrypt")}>Trifid Cipher</button>
        </div>
      );
    }
    else if(this.state.active.menu === false){
      return(
        <div>
          <button className="close" onClick={() => this.toggleView(true, this.state.active.current)}></button>
          <textarea value={this.input} onChange={this.textareaEvent} id="mainInput" readOnly></textarea>
          {this.state.active.reverse && <Reverse translation="encrypt" subType="string" str={this.state.str}/>}
          {this.state.active.atbash && <Atbash translation="encrypt" subType="string" str={this.state.str}/>}
          {this.state.active.ADFGVX && <ADFGVX translation="encrypt" subType="string" str={this.state.str}/>}
		      {this.state.active.foursquare && <FourSquare translation="encrypt" subType="string" str={this.state.str}/>}
		      {this.state.active.bifid && <BIFID translation="encrypt" subType="string" str={this.state.str}/>}
		      {this.state.active.trifid && <Trifid translation="encrypt" subType="string" str={this.state.str}/>} 
        </div>
      );
    }
  }
}

export default MainView;