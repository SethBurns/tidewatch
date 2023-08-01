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

  const handleClick = (e, location) => {
    e.preventDefault();
    setLocation(location);
  };

  const filteredResults = Object.keys(locations).map((area) => {
    return locations[area]
      .filter((place) =>
        place.name.toLowerCase().includes(searchLocation.toLowerCase())
      )
      .map((location) => {
        return (
          <li
            key={location.station}
            onClick={(e) => {
              handleClick(e, location);
            }}
          >
            <Link className="location-button" to={`/${location.station}?date=${dateSelect}`}>
              {location.name}
            </Link>
          </li>
        );
      });
  });

  return (
    <div>
      <form className="search-form">
        <input
          className="search-input"
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
