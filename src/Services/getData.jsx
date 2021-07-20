const getData = () => {
  let month2 = '';
  let day2 = '';
  const numMax = 10;
  const data = new Date();
  const day = data.getDate();
  const month = data.getMonth() + 1;
  if (month < numMax) month2 = `0${month}`;
  if (month >= numMax) month2 = month;
  if (day < numMax) day2 = `0${day}`;
  if (day >= numMax) day2 = day;

  const dataFormatada = `${day2}/${month2}/${data.getFullYear()}`;
  return dataFormatada;
};

export default getData;
