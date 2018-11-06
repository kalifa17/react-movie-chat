import "./App.css";

import React, { Component } from "react";

import MovieListContainer from "./components/MovieListContainer";
import TopBar from "./components/TopBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar title="React Movie Chat" />
        <MovieListContainer />
      </div>
    );
  }
}

export default App;
