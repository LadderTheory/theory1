import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import './components/footer'

const sudoku = require('./sudoku-jsx')

function Tyler() {
  return <p>Thank you Tyler</p>
}

function App() {
  let tyler = <p>Thank You Tyler</p>;

  console.log('a')
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Puzzle</p>
        <sudoku.Board key={7}/>
        <Tyler/>
      </header>
    </div>
  );
}

export default App;
