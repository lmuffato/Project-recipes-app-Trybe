import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const copy = require('clipboard-copy');

export default function useClipBoard(id, type) {
  const [showClipBoardMsg, setShowClipBoardMsg] = useState(false);

  const copyToClipBoard = () => {
    copy(`http://localhost:3000/${type}/${id}`);
    toast('Copied!', {
      icon: '📋',
      style: {
        color: '#FFF',
        background: '#ff2637',
        fontWeight: 'bold',
      },
    });
    setShowClipBoardMsg(true);
  };

  const renderClipBoardMsg = () => (
    <div>
      <Toaster />
    </div>
  );

  return { showClipBoardMsg, copyToClipBoard, renderClipBoardMsg };
}
