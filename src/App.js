import { Location } from './components/Location/Location';
import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchTides } from './apiCalls';

function App() {
  const [tides, setTides] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTides('20230801', '20230831', '9445388')
      .then((data) => {
        let fetchedTides = data.children.map((tide) => {
          return {
            height: tide.attributes.v,
            type: tide.attributes.type,
            time: tide.attributes.t,
          };
        });
        setTides(fetchedTides);
      })
      .catch((error) => {
        setError(`Something went wrong: ${error.message}`);
        console.log(error)
      });
  }, []);

  return (
    <div className="App">
      <Location tides={tides} />
    </div>
  );
}

export default App;
