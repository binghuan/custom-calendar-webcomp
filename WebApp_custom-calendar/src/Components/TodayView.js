import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Paper } from '@material-ui/core';

const TodayView = forwardRef((props, ref) => {
  const iframeRef = useRef(null);

  const sendMessageToIframe = (message) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(message, "*"); // Change "*" to your iframe's origin for security
    }
  };

  useImperativeHandle(ref, () => ({
    sendMessage: sendMessageToIframe
  }));

  return (
    <Paper style={{ height: '400px', overflow: 'hidden' }}>
      <iframe
        ref={iframeRef}
        src="/today-events.html"
        title="Today's Events"
        style={{ width: '100%', height: '100%', border: 'none' }}
        seamless
      ></iframe>
    </Paper>
  );
});

export default TodayView;
