import { useState } from 'react';
import './SearchSelect.css';
import { locations } from '../stationData';
import React from 'react';
import { Link } from 'react-router-dom';

export const SearchSelect = ({ setLocation }) => {
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
          <li className="buttons-container" key={location.station}>
            <Link
              className="location-button"
              to={`/${location.station}?date=${dateSelect}`}
            >
              {location.name}
            </Link>
          </li>
        );
      });
  });

  return (
    <div className='main-display'>
      <form className="search-form">
        <label className="hidden" for="searchInput">
          Search by name
        </label>
        <input
          className="search-input"
          id="searchInput"
          type="text"
          placeholder="Search Location Name"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        ></input>
        <label className="hidden" for="dateInput">
          Date:
        </label>
        <input
          id="dateInput"
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
