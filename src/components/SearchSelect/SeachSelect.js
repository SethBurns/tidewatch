import { useState } from 'react';
import './SearchSelect.css';
import { locations } from '../stationData';
import React from 'react';

export const SearchSelect = () => {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  const [searchLocation, setSearchLocation] = useState('');
  const [dateSelect, setDateSelect] = useState(formattedDate);

  const filteredResults = Object.keys(locations).map((area) => {
    return locations[area]
      .filter((place) =>
        place.name.toLowerCase().includes(searchLocation.toLowerCase())
      )
      .map((location) => {
        return (
          <button
            className="location-button"
            key={[location.latitude, location.longitude]}
          >
            <p>{location.name}</p>
          </button>
        );
      });
  });


  return (
    <div>
      <form className="search-form">
        <input
          type="text"
          placeholder="Search Location Name"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        ></input>
        <input
          className="date-input"
          value={dateSelect}
          type="date"
          onChange={(e) => setDateSelect(e.target.value)}
        ></input>
      </form>
      <ul className="location-buttons">{filteredResults}</ul>
    </div>
  );
};
