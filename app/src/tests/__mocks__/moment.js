const moment = require.requireActual('moment');

// mocked data: 01/01/2018 12:00
export default (timestamp = 1514808000000) => {
  return moment(timestamp);
}
