import { useState } from 'react';

const copy = require('clipboard-copy');

export default function useClipBoard(location) {
  const [showClipBoardMsg, setShowClipBoardMsg] = useState(false);

  const copyToClipBoard = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setShowClipBoardMsg(true);
  };

  return { showClipBoardMsg, copyToClipBoard };
}
