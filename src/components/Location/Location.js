import './Location.css';
import React, { useState } from 'react';
import {
  mutateDate,
  convertDecimalToFeetAndInches,
  extendTideType,
} from '../../util';
import { useEffect } from 'react';
import { fetchTides } from '../../apiCalls';


export const Location = () => {

  const [error, setError] = useState('')
  const [tides, setTides] = useState([])


 useEffect(() => {
    setError('')
    fetchTides(20230801, 20230831, 9445388)
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
        console.log(error)
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

  return (
    <table className="tide-table">
      <thead>
        <tr>
          <th>DATE</th>
          <th>TIDE</th>
        </tr>
      </thead>
      <tbody>{renderedTides}</tbody>
    </table>
  );
};
