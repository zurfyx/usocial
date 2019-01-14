import styled from 'styled-components';
import { colors } from '../theme';

const DefaultButton = styled.button`
  background-color: ${colors.backgroundDark};
  color: ${colors.textContrast};
  border: 0;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 2rem;
`;

export default DefaultButton;
