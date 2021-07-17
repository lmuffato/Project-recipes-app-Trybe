/* pego de https://www.w3docs.com/snippets/javascript/
how-to-get-the-current-date-and-time-in-javascript.html */

const setDate = () => {
  const currentDate = new Date();
  const cDay = currentDate.getDate();
  const cMonth = currentDate.getMonth() + 1;
  const cYear = currentDate.getFullYear();
  const date = `${cDay}/${cMonth}/${cYear}`;
  return date;
};

export default setDate;
