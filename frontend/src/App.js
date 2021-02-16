import logo from './logo.svg';
import './App.css';

function Tyler() {
  return <p>Thank you Tyler</p>
}

function App() {
  let tyler = <p>Thank You Tyler</p>;
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Tyler />
      </header>
    </div>
  );
}

export default App;
