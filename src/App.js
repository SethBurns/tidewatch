// import { Location } from './components/Location/Location';
import React from 'react';
import './App.css';
import { useState } from 'react';
// import { fetchTides } from './apiCalls';
import { SearchSelect } from './components/SearchSelect/SeachSelect';
import { Location } from './components/Location/Location';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [error, setError] = useState(undefined);
  const [location, setLocation] = useState({})

  return (
    <div className="App">
      <h1>tideWAtch</h1>
      <Routes>
        <Route path='/' element={<SearchSelect setLocation={setLocation} />}/>
        <Route path='/:station' element={!error && <Location location={location} setError={setError} />}/>
      </Routes>
    </div>
  );
}

export default App;
