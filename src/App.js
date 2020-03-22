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
    this.callBackStr = this.callBackStr.bind(this);
    this.getStr = this.getStr.bind(this);
  }
  
  callBackStr(str) {
    this.str = str;
  }
  getStr(){
    return this.str;
  }

  render(){
    return (
      <div className="App">
        <div className="split" id="main">
          <MainView callBackStr={this.callBackStr}/>
        </div>
        <div className="split" id="side">
          <SideView getStr={this.getStr}/>
        </div>
      </div>
    );
  }
}

export default App;
