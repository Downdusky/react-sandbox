import { useState } from 'react'
import logo from './logo.svg';
import './App.css';

import DeathNote from './pages/DeathNote'

const App = () => {
  const [page, setPage] = useState('home')

  return (
    <>
      {page === 'home' && (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>React Sandbox</h1>
            <p>Liste des projets</p>

            <a className="App-link" type="button" onClick={() => setPage('deathNote')}>
              Death Note
            </a>
          </header>
        </div>
      )}
      {page === 'deathNote' && <DeathNote />}
    </>
  );
}

export default App;
