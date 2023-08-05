import './Saved.css';
import React from 'react';
import {
  mutateDate,
  extendTideType,
  convertDecimalToFeetAndInches,
} from '../../util';
import PropTypes from 'prop-types';

const Saved = ({ savedTides, setSavedTides }) => {
  const handleDelete = (e, tidetime) => {
    e.preventDefault();
    setSavedTides(savedTides.filter((tide) => tide.tide.time !== tidetime));
  };

  const renderSavedTides = savedTides.map((tide) => {
    return (
      <tr className="tide-entry" key={tide.tide.time}>
        <td className="tide-location">{tide.location.name}</td>
        <td className="tide-time">{mutateDate(tide.tide.time)}</td>
        <td className="tide-height">
          {extendTideType(tide.tide.type)}:{' '}
          {convertDecimalToFeetAndInches(tide.tide.height)}
        </td>
        <td
          className="tide-delete"
          onClick={(e) => {
            handleDelete(e, tide.tide.time);
          }}
        >
          <span className="trash" role="img" aria-label="Delete Tide">
            🗑️
          </span>
        </td>
      </tr>
    );
  });

  return (
    <main className="saved-tides-page">
      <h1>SAVED TIDES</h1>
      {!savedTides.length && (
        <h1 className="no-tides">You have no saved tides!</h1>
      )}
      {savedTides.length > 0 && (
        <table className="saved-tides-table">
          <thead>
            <tr>
              <th className="tide-location">LOCATION</th>
              <th className="tide-time">DATE & TIME</th>
              <th className="tide-height">TIDE</th>
              <th className="tide-delete">
                <span role="img" aria-label="Delete Tide">
                  🗑️
                </span>
              </th>
            </tr>
          </thead>
          <tbody>{renderSavedTides}</tbody>
        </table>
      )}
    </main>
  );
};

Saved.propTypes = {
  savedTides: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.string,
      type: PropTypes.string,
      time: PropTypes.string,
    })
  ),
  setSavedTides: PropTypes.func,
};

export { Saved };
