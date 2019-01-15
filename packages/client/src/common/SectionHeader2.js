import styled from 'styled-components';
import { colors } from '../app/theme';

const SectionHeader2 = styled.h2`
  padding-bottom: 1rem;
  ${props => props.border === false ? '' : `border-bottom: 1px solid ${colors.separator}`};
`;

export default SectionHeader2;
