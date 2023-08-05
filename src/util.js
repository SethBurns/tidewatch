import { locations } from './components/stationData';

function formatDate(inputDate) {
  const dateObj = new Date(inputDate);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = dateObj.getDate();
  const monthName = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  let daySuffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  }

  const formattedDate = `${monthName} ${day}${daySuffix}, ${year}`;
  return formattedDate;
}

function formatTime(inputTime) {
  const [hours, minutes] = inputTime.split(':');

  const dummyDate = new Date();
  dummyDate.setHours(parseInt(hours));
  dummyDate.setMinutes(parseInt(minutes));

  const formattedTime = dummyDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return formattedTime;
}

export const mutateDate = (date) => {
  let d = date.split(' ');
  let day = formatDate(d[0]);
  let time = formatTime(d[1]);
  return `${day} at ${time}`;
};

export const convertDecimalToFeetAndInches = (decimalHeight) => {
  const totalInches = Math.round(decimalHeight * 12);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;

  if (feet > 0 && inches > 0) {
    return `${feet} foot ${inches} inches`;
  } else if (feet === 0) {
    return `${inches} inches`;
  } else {
    return `${feet} foot`;
  }
};

export const extendTideType = (type) => {
  if (type === 'H') {
    return 'High';
  } else {
    return 'Low';
  }
};

export function addDaysToDate(dateString, daysToAdd) {
  const date = new Date(dateString); // Convert the date string to a Date object
  date.setDate(date.getDate() + daysToAdd); // Add 30 days
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function findNameByStation(station) {
  for (const key in locations) {
    const locationArray = locations[key];
    const foundLocation = locationArray.find(
      (item) => item.station === station
    );
    if (foundLocation) {
      return foundLocation;
    }
  }
  return 'If you are going to type in your own custom URL, you better be sure you know what you are doing. Oh... I mean... ERROR! Station does not exist!';
}

export function cleanData(data) {
    return data.predictions.map((tide) => {
      return {
        height: tide.v,
        type: tide.type,
        time: tide.t,
      };
    });
  }

