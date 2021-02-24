import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import Footer from './components/footer'
import { ApiFilter } from './components/sudoku-api-filter';
import { Board } from './components/sudoku-jsx';
//import './components/sudoku-jsx'

//const sudoku = require('./components/sudoku-jsx')

function Tyler() {
  return <p>Thank you Tyler</p>
}

function App() {
  let tyler = <p>Thank You Tyler</p>;

  console.log('a')
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome!</p>
        <Board />
        <ApiFilter />
        <Footer />
      </header>
    </div>
  );
}

export default App;
