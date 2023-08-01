// import { Location } from './components/Location/Location';
import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchTides } from './apiCalls';
import { SearchSelect } from './components/SearchSelect/SeachSelect';

function App() {
  const [tides, setTides] = useState([]);
  const [error, setError] = useState('');
  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState('')
  // const [station, setStation] = useState('')

  // useEffect(() => {
  //   setError('')
  //   fetchTides(startDate, endDate, station)
  //     .then((data) => {
  //       let fetchedTides = data.predictions.map((tide) => {
  //         return {
  //           height: tide.v,
  //           type: tide.type,
  //           time: tide.t,
  //         };
  //       });
  //       setTides(fetchedTides);
  //     })
  //     .catch((error) => {
  //       setError(`Something went wrong: ${error.message}`);
  //       console.log(error)
  //     });
  // }, []);

  return (
    <div className="App">
      <SearchSelect />
      {error.message && <p>{error}</p>}
      {/* {!error.message && <Location tides={tides} />} */}
    </div>
  );
}

export default App;
