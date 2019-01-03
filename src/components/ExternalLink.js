import React from 'react';

function ExternalLink(props) {
  const {children, ...rest} = props; // Hides A11 warning
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">{children}</a>
  );
}

export default ExternalLink;
