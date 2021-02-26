import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import Footer from './components/footer'
import { ApiFilter } from './components/sudoku-api-filter';
import { Board } from './components/sudoku-jsx';
import './components/filterbox'
import { FilterBox } from './components/filterbox';
//import './components/sudoku-jsx'

//const sudoku = require('./components/sudoku-jsx')

function Tyler() {
  return <p>Thank you Tyler</p>
}

function App() {
  let tyler = <p>Thank You Tyler</p>;

  let ft = FilterBox.template;

  let filters = [
    ft(FilterBox.types.CHECKBOX),
    ft(FilterBox.types.CHECKBOX),
    ft(FilterBox.types.CHECKBOX),
  ]

  let mainFilter = (
    <FilterBox filters={filters}/>
  )
  
  return (
    <div className="App">
      <header className="App-header">
        {mainFilter}
        <p>Welcome!</p>
        <Board />
        <Footer />
      </header>
    </div>
  );
}

export default App;
