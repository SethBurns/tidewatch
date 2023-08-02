import React from 'react';
import './App.css';
import { useState } from 'react';
import { SearchSelect } from './components/SearchSelect/SearchSelect';
import { Location } from './components/Location/Location';
import { Routes, Route } from 'react-router-dom';
import { Saved } from './components/Saved/Saved';

function App() {
  const [error, setError] = useState(undefined);
  const [savedTides, setSavedTides] = useState([])

  return (
    <div className="App">
      <h1>tideWAtch</h1>
      <Routes>
        <Route path='/' element={<SearchSelect />}/>
        <Route path='/saved' element={<Saved />}/>
        <Route path='/:station' element={!error && <Location savedTides={savedTides} setSavedTides={setSavedTides} setError={setError} />}/>
      </Routes>
    </div>
  );
}

export default App;
