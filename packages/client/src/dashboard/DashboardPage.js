/**
 * Pages inside dashboard should probably extend this
 */
import styled from 'styled-components';
import { sizes } from '../app/theme';
import MaxWidth from '../common/MaxWidth';

const DashboardPage = styled(MaxWidth)`
  padding: 4.2rem;

  @media (max-width: ${sizes.phablet}) {
    padding: 2rem;
  }
`;

export default DashboardPage;
