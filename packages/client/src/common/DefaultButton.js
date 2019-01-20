import styled from 'styled-components';
import { colors } from '../app/theme';

const DefaultButton = styled.button`
  background-color: ${colors.backgroundAlternative};
  color: ${colors.textContrast};
  border: 1px solid ${colors.backgroundAlternative};
  border-radius: 5px;
  font-weight: 600;
  padding: 1rem 1.5rem;
`;

export default DefaultButton;
