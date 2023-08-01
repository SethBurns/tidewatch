import './Location.css';
import React from 'react';
import {
  mutateDate,
  convertDecimalToFeetAndInches,
  extendTideType,
} from '../../util';
import { locations } from '../stationData';

export const Location = ({ tides }) => {
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
