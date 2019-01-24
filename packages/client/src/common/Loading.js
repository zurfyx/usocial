import React, { useState, useEffect, Fragment } from 'react';

function Loading({ text }) {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDotCount((dotCount + 1) % 4);
    }, 250);
    return () => window.clearInterval(interval);
  }, []);

  return <Fragment>{text}{'.'.repeat(dotCount)}</Fragment>
}

export default Loading;
