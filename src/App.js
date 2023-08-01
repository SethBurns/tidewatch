// import { Location } from './components/Location/Location';
import React from 'react';
import './App.css';
// import { useEffect, useState } from 'react';
// import { fetchTides } from './apiCalls';
import { SearchSelect } from './components/SearchSelect/SeachSelect';
import { Location } from './components/Location/Location'

function App() {

 

  return (
    <div className="App">
      <SearchSelect />
      <Location  />
    </div>
  );
}

export default App;
