import { Location } from './components/Location/Location';
import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchTides } from './apiCalls';

function App() {

  const [tides, setTides] = useState([])

  useEffect(() => {
    setTides(fetchTides("20230801", "20230831", "9445388"))
    console.log(tides)
  }, [])

  // const renderedTides = tides.map(tide => )

  return (
    <div className="App">
      <Location />
    </div>
  );
}

export default App;
