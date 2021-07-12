const copyToClipboard = ({ target }, setIsCopy) => {
  setIsCopy(true);
  console.log(target);
  const { alt } = target;
  const path = `http://localhost:3000/${alt}`;
  navigator.clipboard.writeText(path);
};

export default copyToClipboard;
