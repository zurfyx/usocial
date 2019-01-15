import styled from 'styled-components';
import { colors } from '../app/theme';

const SectionHeader1 = styled.h1`
  padding-bottom: 1.2rem;
  ${props => props.border === false ? '' : `border-bottom: 1px solid ${colors.separator}`};
`;

export default SectionHeader1;
