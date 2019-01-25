import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Hidden = styled.span`
  visibility: hidden;
`;

function Loading({ text }) {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDotCount((dotCount + 1) % 4);
    }, 250);
    return () => window.clearInterval(interval);
  });

  return (
    <span>
      {text}
      <span>{'.'.repeat(dotCount)}</span>
      <Hidden>{'.'.repeat(3 - dotCount)}</Hidden>
    </span>
  );
}

export default Loading;
