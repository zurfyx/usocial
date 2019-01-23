import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors } from '../app/theme';

const NeatNavLink = styled(NavLink)`
  color: ${colors.textDefault};
`;

export default NeatNavLink;
