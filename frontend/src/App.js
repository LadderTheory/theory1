import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'

const sudoku = require('./sudoku-jsx')

function Tyler() {
  return <p>Thank you Tyler</p>
}

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [puzzle, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost/sudoku/api?steps=t")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <p>hi</p>
    );
  }
}

function App() {
  let tyler = <p>Thank You Tyler</p>;

  console.log('a')
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Puzzle</p>
        {sudoku.Board()}
        {sudoku.FillButton()}
        <p>MyComponent</p>
        {MyComponent()}
      </header>
    </div>
  );
}

export default App;
