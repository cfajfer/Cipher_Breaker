import React from 'react';
import MainView from './mainView';
import SideView from './sideView';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.str = "";
    this.textareaEvent = this.textareaEvent.bind(this);
    this.getStr = this.getStr.bind(this);
  }
  
  textareaEvent(event) {
    this.str = event.target.value;
  }
  getStr(){
    return this.str;
  }

  render(){
    return (
      <div className="App">
        <div className="split" id="main">
          <MainView textareaEvent={this.textareaEvent}/>
        </div>
        <div className="split" id="side">
          <SideView getStr={this.getStr}/>
        </div>
      </div>
    );
  }
}

export default App;
