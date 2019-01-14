import styled from 'styled-components';
import { colors } from '../app/theme';

const DefaultInput = styled.input`
  background-color: #f4f4f4;
  color: ${colors.textDefault};
  border: 0;
  border-radius: 5px;
  font-size: 1.6rem;
  line-height: 2rem;
  padding: 0.85rem 1.2rem;
`;

export default DefaultInput;
