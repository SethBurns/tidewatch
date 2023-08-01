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

export const Location = ({ setError }) => {
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
        setError(`Something went wrong: ${error.message}`);
        console.log(error);
      });
  }, []);

  const renderedTides = tides.map((tide) => {
    return (
      <tr className="tide-entry" key={tide.time}>
        <td className="tide-time">{mutateDate(tide.time)}</td>
        <td className="tide-height">
          {extendTideType(tide.type)}:{' '}
          {convertDecimalToFeetAndInches(tide.height)}
        </td>
      </tr>
    );
  });

  let location = findNameByStation(station);

  return (
    <main className={`${location.station} main-page`}>
      <h1>{location.name}</h1>
      <table className="tide-table">
        <thead>
          <tr>
            <th>DATE & TIME</th>
            <th>TIDE</th>
          </tr>
        </thead>
        <tbody>{renderedTides}</tbody>
      </table>
    </main>
  );
};
