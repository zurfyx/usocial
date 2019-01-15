import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../app/theme';

const NeatLink = styled(Link)`
  color: ${colors.textDefault};
`;

export default NeatLink;
