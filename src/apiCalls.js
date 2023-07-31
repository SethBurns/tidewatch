import XMLParser from 'react-xml-parser';

export const fetchTides = (startDate, endDate, station) => {
  return fetch(
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=${startDate}&end_date=${endDate}&station=${station}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=xml`
  )
    .then((response) => response.text())
    .then((data) => {
      let xml = new XMLParser().parseFromString(data);
      return xml
    })
};
