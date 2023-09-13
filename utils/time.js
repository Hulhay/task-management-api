const moment = require("moment");

const now = () => {
  return new Date(Date.now());
};

const stringToDateTime = (dateTimeString) => {
  const dateParts = dateTimeString.split(" ");
  const [datePart, timePart] = dateParts;
  const [year, month, day] = datePart.split("-");
  const [hour, minute, second] = timePart.split(":");
  return new Date(year, month - 1, day, hour, minute, second);
};

const formatDateString = (date, format) => {
  return moment(date).format(format);
};

module.exports = { stringToDateTime, formatDateString, now };
