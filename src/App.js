import React from 'react';
import './App.css';
import { useState } from 'react';
import { SearchSelect } from './components/SearchSelect/SearchSelect';
import { Location } from './components/Location/Location';
import { Routes, Route, Link } from 'react-router-dom';
import { Saved } from './components/Saved/Saved';

function App() {
  const [error, setError] = useState(undefined);
  const [savedTides, setSavedTides] = useState([]);

  return (
    <div className="App">
      <nav className="navbar">
        <Link to="/">
          <p className="pbutton">Search</p>
          <div className="search-button"></div>
        </Link>
        <Link to="/">
          <h1>tideWAtch</h1>
        </Link>
        <Link to="/saved">
          <p className="pbutton">Saved</p>
          <div className="saved-button"></div>
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<SearchSelect />} />
        <Route
          path="/saved"
          element={
            <Saved savedTides={savedTides} setSavedTides={setSavedTides} />
          }
        />
        <Route
          path="/:station"
          element={
            error ? (
              <p>{error}</p>
            ) : (
              <Location
                savedTides={savedTides}
                setSavedTides={setSavedTides}
                setError={setError}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
