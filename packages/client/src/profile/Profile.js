import React from 'react';
import styled from 'styled-components';
import { spaces } from '../app/theme';
import MaxWidth from '../common/MaxWidth';

const ProfileContainer = styled(MaxWidth)`
  padding: ${spaces.section};
`;

function Profile() {
  return (
    <ProfileContainer>
      ..
    </ProfileContainer>
  )
}

export default Profile;
