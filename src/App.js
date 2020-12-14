import React from 'react';
import './App.css';
import MovieRaterContainer from "./containers/MovieRaterContainer";

const App = () =>
    <div className="bodycolor">
        <div className={`container`}>
          <MovieRaterContainer/>
        </div>
    </div>

export default App;
