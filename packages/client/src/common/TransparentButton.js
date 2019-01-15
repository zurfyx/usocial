import styled from 'styled-components';
import DefaultButton from './DefaultButton';

const TransparentButton = styled(DefaultButton)`
  font-weight: 400;
  color: #4c4c4c;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;

  & + & {
    margin-left: 1rem;
  }
`;

export default TransparentButton;
