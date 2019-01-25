import React, { useState } from 'react';
import { connect } from '../utils/react-context';
import { refresh } from '../app/UserProvider';
import { UserContext } from '../app/UserProvider';
import ToolItem from '../common/ToolItem';
import Loading from '../common/Loading';

function RefreshTool({ user }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function onRefresh() {
    if (isRefreshing) {
      return;
    }
    setIsRefreshing(true);
    await refresh.call(RefreshTool, user);
    setIsRefreshing(false);
  }

  return (
    <ToolItem onClick={onRefresh}>
      {isRefreshing ? <Loading text="Refreshing" /> : 'Refresh'}
    </ToolItem>
  );
}

export default connect('user', UserContext.Consumer, RefreshTool);
