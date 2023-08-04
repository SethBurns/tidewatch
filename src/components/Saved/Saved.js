import './Saved.css';
import React from 'react';
import {
  mutateDate,
  extendTideType,
  convertDecimalToFeetAndInches,
} from '../../util';

export const Saved = ({ savedTides, setSavedTides }) => {


  const handleDelete = (e, tidetime) => {
    e.preventDefault()
    setSavedTides(savedTides.filter(tide => tide.tide.time !== tidetime))
  }

  const renderSavedTides = savedTides.map((tide) => {
    return (
      <tr className="tide-entry" key={tide.tide.time}>
        <td className="tide-location">{tide.location.name}</td>
        <td className="tide-time">{mutateDate(tide.tide.time)}</td>
        <td className="tide-height">
          {extendTideType(tide.tide.type)}:{' '}
          {convertDecimalToFeetAndInches(tide.tide.height)}
        </td>
        <td className="tide-delete" onClick={(e) => {handleDelete(e, tide.tide.time)}}>🗑️</td>
      </tr>
    );
  });

  return (
    <main className="saved-tides-page">
      <h1>SAVED TIDES</h1>
      {!savedTides.length && <h1 className='no-tides'>You have no saved tides!</h1>}
      {savedTides.length > 0 && <table className="saved-tides-table">
        <thead>
          <tr>
            <th className="tide-location">LOCATION</th>
            <th className="tide-time">DATE & TIME</th>
            <th className="tide-height">TIDE</th>
            <th className="tide-delete">🗑️</th>
          </tr>
        </thead>
        <tbody>{renderSavedTides}</tbody>
      </table>}
    </main>
  );
};
