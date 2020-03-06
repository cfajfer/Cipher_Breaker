import React from 'react';
import Reverse from './reverse';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    //Construct States
    this.state = { 
      active: {
        reverse: false,
      },
      str: ""
    };
    //Class Variables

    //Bind Update Methods
    this.textareaEvent = this.textareaEvent.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  textareaEvent(event) {
    this.setState({str: event.target.value});
  }

  toggleView(component){
    switch(component){
      case "reverseEncrypt":
          this.setState(prevState => ({
            active: {
            ...prevState.active,
            reverse: !this.state.active.reverse
            }
          }));
          break;
    }
  }

  render() {
    return(
      <div>
        <textarea value={this.str} onChange={this.textareaEvent}></textarea>
        <br/>
        <button type="button" onClick={() => this.toggleView("reverseEncrypt")}>Reverse Encrypt Toggle</button>
        {this.state.active.reverse && <Reverse translation="encrypt" subType="string" str={this.state.str}/>}
      </div>
    );
  }
}

export default MainView;