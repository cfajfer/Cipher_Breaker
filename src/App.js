import React from 'react';
import MainView from './mainView';
import SideView from './sideView';
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      main: {width: "65%"},
      side: {width: "35%"},
      slider: {transform: "scaleX(1)"}
    };
    this.slider = 0;
    this.str = "";
    this.callBackStr = this.callBackStr.bind(this);
    this.getStr = this.getStr.bind(this);
    this.sliderHandler = this.sliderHandler.bind(this);
  }
  
  callBackStr(str) {
    this.str = str;
    console.log(this.str);
  }
  getStr(){
    return this.str;
  }
  sliderHandler(){
    if(this.slider === 0){
      this.slider++;
      this.setState({main: {width: "100%"}, side: {width: "0%"}, slider: {transform: "scaleX(-1)"}});
    }
    else if(this.slider === 1){
      this.slider--;
      this.setState({main: {width: "65%"}, side: {width: "35%"}, slider: {transform: "scaleX(1)"}});
    }
  }

  render(){
    return (
      <div className="App">
        <div className="split" id="main" style={this.state.main}>
          <MainView callBackStr={this.callBackStr}/>
          <FontAwesomeIcon icon={faAngleDoubleRight} onClick={this.sliderHandler} className="slider" style={this.state.slider}/>
        </div>
        <div className="split" id="side" style={this.state.side}>
          <SideView getStr={this.getStr}/>
        </div>
      </div>
    );
  }
}

export default App;
