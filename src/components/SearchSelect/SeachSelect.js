import { useState } from 'react';
import './SearchSelect.css';
import { locations } from '../stationData';
import React from 'react';

export const SearchSelect = () => {

  const [searchLocation, setSearchLocation] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');

  

  const filteredResults = Object.keys(locations).map(area => {
    return locations[area].filter((place) => place.name.toLowerCase().includes(searchLocation.toLowerCase())).map((location) => {
      return (
        <button className='location-button' key={[location.latitude, location.longitude]}>
          <p>{location.name}</p>
        </button>
      )
    })
  })
   

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search Location Name"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        ></input>
      </form>
      <ul className='location-buttons'>{filteredResults}</ul>
    </div>
  );
};
