export const fetchTides = (startDate, endDate, station) => {
  return fetch(
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=${startDate}&end_date=${endDate}&station=${station}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json`
  ).then((response) => {
    return response.json();
  });
};
