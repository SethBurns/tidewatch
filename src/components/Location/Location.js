import './Location.css';
import React, { useState } from 'react';
import {
  mutateDate,
  convertDecimalToFeetAndInches,
  extendTideType,
  addDaysToDate,
  findNameByStation,
  cleanData,
} from '../../util';
import { useEffect } from 'react';
import { fetchTides } from '../../apiCalls';
import { useParams, useSearchParams } from 'react-router-dom';
import star from '../../images/favorited.png';
import PropTypes from 'prop-types'

export const Location = ({
  savedTides,
  setSavedTides,
  setError,
  setServerDown,
  error,
}) => {
  const { station } = useParams();
  const [date] = useSearchParams();
  const startDate = addDaysToDate(date.get('date'), 2).replaceAll('-', '');
  const endDate = addDaysToDate(date.get('date'), 30).replaceAll('-', '');
  const [tides, setTides] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');
  const [displaySavedResponse, setDisplaySavedResponse] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLocation = () => {
    let result = findNameByStation(station);
    if (typeof result === 'string') {
      setError(result);
      return false;
    } else {
      return result;
    }
  };

  let location = checkLocation();

  useEffect(() => {
    setError('');

    const p = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 750);
    });
    // This is to ensure the loading sign is seen for at least .75 seconds, but not more than it needs to be if
    // the fetch promise is delivered earlier.
    Promise.all([
      p,
      fetchTides(startDate, endDate, station)
        .then((data) => {
          let cleanedData = cleanData(data);
          return cleanedData;
        })
        .catch((error) => {
          console.log(error);
          setError(`Something went wrong when fetching the tide data.`);
          setServerDown(true);
          setLoading(false);
        }),
    ]).then(([_, cleanedData]) => {
      setTides(cleanedData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (displaySavedResponse) {
      setTimeout(() => {
        setDisplaySavedResponse(false);
      }, 5000);
    }
  }, [displaySavedResponse]);

  const handleClick = (e, tide, location) => {
    e.preventDefault();
    let newSavedTide = {
      tide,
      location,
    };
    if (
      savedTides.map((tide) => tide.tide.time).includes(newSavedTide.tide.time)
    ) {
      setSaveMessage(`You have saved this tide already.`);
      setDisplaySavedResponse(true);
      return;
    } else {
      setSavedTides([...savedTides, newSavedTide]);
      setSaveMessage(`Saved!`);
      setDisplaySavedResponse(true);
      console.log(savedTides)
    }
  };

  const renderedTides = tides.map((tide) => {
    return (
      <tr className="tide-entry" key={tide.time}>
        <td className="tide-time">{mutateDate(tide.time)}</td>
        <td className="tide-height">
          {extendTideType(tide.type)}:{' '}
          {convertDecimalToFeetAndInches(tide.height)}
        </td>
        <td className="center">
          <img
            alt="Star, click to favorite"
            src={star}
            onClick={(e) => handleClick(e, tide, location)}
            className="tide-save-l"
          ></img>
        </td>
      </tr>
    );
  });

  const renderMain = () => {
    return (
      <div>
        {loading ? (
          <h1 className="loading">LOADING</h1>
        ) : (
          <h1>{location.name}</h1>
        )}
        <h2
          className={
            displaySavedResponse
              ? 'save-display saved-confirmation'
              : 'saved-confirmation hidden'
          }
        >
          {saveMessage}
        </h2>
        <table className="tide-table">
          <thead>
            <tr>
              <th className="tide-time-l">DATE & TIME</th>
              <th className="tide-height-l">TIDE</th>
              <th className="tide-save-head">SAVE?</th>
            </tr>
          </thead>
          <tbody>{renderedTides}</tbody>
        </table>
      </div>
    );
  };

  return (
    <main className={`main-page`}>
      {!location ? <h1>{error}</h1> : renderMain()}
    </main>
  );
};


Location.propTypes = {
  savedTides: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.string,
        longitude: PropTypes.string,
        name: PropTypes.string,
        station: PropTypes.string,
      }),
      tide: PropTypes.shape({
        height: PropTypes.string,
        time: PropTypes.string,
        type: PropTypes.string,
      }),
    })
  ),
  setSavedTides: PropTypes.func,
  setError: PropTypes.func,
  setServerDown: PropTypes.func,
  error: PropTypes.string,
}