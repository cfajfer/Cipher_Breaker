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

    //Bind Update Methods
    this.textareaEvent = this.textareaEvent.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  textareaEvent(event) {
    this.setState({str: event.target.value});
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
          <textarea value={this.state.str} onChange={this.textareaEvent}></textarea>
          <br/>
          <button type="button" onClick={() => this.toggleView(false, "reverseEncrypt")}>Reverse Encrypt Toggle</button>
        </div>
      );
    }
    else if(this.state.active.menu === false){
      return(
        <div>
          <a class="close" onClick={() => this.toggleView(true, this.state.active.current)}></a>
          <p>{this.state.str}</p>
          {this.state.active.reverse && <Reverse translation="encrypt" subType="string" str={this.state.str}/>}
        </div>
      );
    }
  }
}

export default MainView;