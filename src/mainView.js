import React from 'react';
import Reverse from './reverse';

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
    this.props.callBackStr(this.state.str);
  }

  inputSanatize(){ //Produces UpperCase string w/ no whitespace
    var cleanStr = this.input;
    cleanStr = cleanStr.trim();
    cleanStr = cleanStr.toUpperCase();
    cleanStr = cleanStr.replace(/\s+/g, '');
    this.setState({str: cleanStr});
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
          <textarea value={this.input} onChange={this.textareaEvent}></textarea>
          <br/>
          {/* Cryptography Toggles Go Here */}

          <button type="button" onClick={() => this.toggleView(false, "reverseEncrypt")}>Reverse Encrypt Toggle</button>

          {/* END */}
        </div>
      );
    }
    else if(this.state.active.menu === false){
      return(
        <div>
          <button className="close" onClick={() => this.toggleView(true, this.state.active.current)}></button>
          <p>{this.state.str}</p>
          {/* Cryptography Components Go Here */}

          {this.state.active.reverse && <Reverse translation="encrypt" subType="string" str={this.state.str}/>}

          {/* END */}

        </div>
      );
    }
  }
}

export default MainView;