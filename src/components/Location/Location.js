import './Location.css';
import React, { useState } from 'react';
import {
  mutateDate,
  convertDecimalToFeetAndInches,
  extendTideType,
  addDaysToDate,
  findNameByStation,
} from '../../util';
import { useEffect } from 'react';
import { fetchTides } from '../../apiCalls';
import { useParams, useSearchParams } from 'react-router-dom';

export const Location = ({ savedTides, setSavedTides, setError }) => {
  const { station } = useParams();
  const [searchParams] = useSearchParams();
  const startDate = addDaysToDate(searchParams.get('date'), 2).replaceAll(
    '-',
    ''
  );
  const endDate = addDaysToDate(searchParams.get('date'), 30).replaceAll(
    '-',
    ''
  );
  const [tides, setTides] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');
  const [displaySavedResponse, setDisplaySavedResponse] = useState(false);

  const checkLocation = () => {
    let result = findNameByStation(station);
    if (typeof result === 'string') {
      setError(result);
      return;
    } else {
      return result;
    }
  };

  let location = checkLocation();

  useEffect(() => {
    setError('');
    fetchTides(startDate, endDate, station)
      .then((data) => {
        let fetchedTides = data.predictions.map((tide) => {
          return {
            height: tide.v,
            type: tide.type,
            time: tide.t,
          };
        });
        setTides(fetchedTides);
      })
      .catch((error) => {
        setError(`Something went wrong during fetch: ${error.message}`);
        console.log(error);
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
          <button
            onClick={(e) => handleClick(e, tide, location)}
            className="tide-save"
          ></button>
        </td>
      </tr>
    );
  });

  return (
    <main className={`${location.station} main-page`}>
      <h1>{location.name}</h1>
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
            <th>DATE & TIME</th>
            <th>TIDE</th>
            <th>SAVE?</th>
          </tr>
        </thead>
        <tbody>{renderedTides}</tbody>
      </table>
    </main>
  );
};
