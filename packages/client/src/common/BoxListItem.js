import styled from 'styled-components';
import { colors, spaces } from '../app/theme';

const BoxListItem = styled.li`
  padding: ${spaces.default};

  & + & {
    border-top: 1px solid ${colors.separator};
  }
`;

export default BoxListItem;
