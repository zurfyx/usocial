import React from 'react';
import ReactMarkdown from 'react-markdown';
import DashboardPage from '../dashboard/DashboardPage';
import raw from 'raw.macro';

function Integrate() {
  const usocialReadme = raw('../../../usocial/README.md');
  return (
    <DashboardPage>
      <ReactMarkdown source={usocialReadme} />
    </DashboardPage>
  );
}

export default Integrate;
