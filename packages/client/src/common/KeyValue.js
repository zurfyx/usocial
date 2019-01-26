import styled from 'styled-components';
import { sizes } from '../app/theme';

const KeyValuePair  = styled.dl`
  display: grid;
  grid-template-columns: 110px 1fr;
  grid-column-gap: 4rem;
  grid-row-gap: 0.55rem;

  dd {
    margin-left: 0;
  }

  @media (max-width: ${sizes.phablet}) {
    display: inline;

    dd {
      margin-bottom: 1rem;
    }
  }
`;

export default KeyValuePair;
