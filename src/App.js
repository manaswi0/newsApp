import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js';
import News from './components/News.js';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey= process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <Router>
        <LoadingBar
        color="#f11946"
        progress={this.state.progress}
      />
        <Navbar /> {/* ✅ Navbar is outside <Routes> */}
        <Routes>
          {/* here key is passed becoz it acts as an identifier and using it we can update the content without the need of reloading the pg */}
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={9} country='us' category='general' />} />
          <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={9} country='us' category='general' />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" pageSize={9} country='us' category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pageSize={9} country='us' category='entertainment' />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pageSize={9} country='us' category='health' />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pageSize={9} country='us' category='science' />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pageSize={9} country='us' category='sports' />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pageSize={9} country='us' category='technology' />} />
        </Routes>
      </Router>
    );
  }
}
