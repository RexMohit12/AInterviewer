import './App.css';
import Container from './Components/Container.js';
import Nav from './Components/Nav.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav/>
        <Container/>
      </header>
    </div>
  );
}

export default App;
