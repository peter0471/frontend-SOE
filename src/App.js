import React, { Component } from "react";
import axios, * as others from "axios";
import Upload from './components/Upload';
import Navbar from "./components/Navbar";


axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] = "*application/json";

export default class App extends Component {
  render() {
      return (<div>
        <Navbar/>
        <Upload/>         
      </div>
      
    );
  }
}