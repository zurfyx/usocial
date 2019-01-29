import React, { useState } from 'react';
import { connect } from '../utils/react-context';
import { sync } from '../app/UserProvider';
import { UserContext } from '../app/UserProvider';
import ToolItem from '../common/ToolItem';
import Loading from '../common/Loading';

function SyncTool({ user }) {
  const [isSyncing, setIsSyncing] = useState(false);

  async function onSync() {
    if (isSyncing) {
      return;
    }
    setIsSyncing(true);
    await sync.call(SyncTool, user);
    setIsSyncing(false);
  }

  return (
    <ToolItem onClick={onSync}>
      {isSyncing ? <Loading text="Synchronizing" /> : 'Synchronize'}
    </ToolItem>
  );
}

export default connect('user', UserContext.Consumer, SyncTool);
