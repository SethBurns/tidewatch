import './Location.css'
import React from 'react'

export const Location = ({tides}) => {


  const renderedTides = tides.map(tide => {
    return (
      <li className='tide-entry' key={tide.time}>
        <p>Date & Time: {tide.time}</p>
        <p>Height: {tide.height}</p>
        <p>{tide.type}</p>
      </li>
    )
  })

  return (
    <ul>
      {renderedTides}
    </ul>
  )
}