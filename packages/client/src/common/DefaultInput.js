import styled from 'styled-components';
import { colors } from '../app/theme';

const DefaultInput = styled.input`
  background-color: #f4f4f4;
  color: ${colors.textDefault};
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  ${props => props.error ? 'outline-color: #f44336' : ''}
  line-height: 2rem;
  padding: 1rem 1.5rem;
`;

export default DefaultInput;
