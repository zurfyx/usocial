import styled from 'styled-components';
import { colors } from '../app/theme';

const DefaultButton = styled.button`
  background-color: ${colors.backgroundAlternative};
  color: ${colors.textContrast};
  border: 0;
  border-radius: 5px;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2rem;
  padding: 0.85rem 2rem;
`;

export default DefaultButton;
