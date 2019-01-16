import styled from 'styled-components';
import { colors, spaces } from '../app/theme';

const Box = styled.div`
  border: 1px solid ${colors.separator};
  border-radius: 5px;
  padding: ${spaces.default};

  & + & {
    margin-top: 3rem;
  }
`;

export default Box;
