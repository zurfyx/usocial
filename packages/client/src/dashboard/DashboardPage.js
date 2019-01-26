/**
 * Pages inside dashboard should probably extend this
 */
import styled from 'styled-components';
import { sizes } from '../app/theme';

const DashboardPage = styled.div`
  padding: 4.2rem;

  @media (max-width: ${sizes.phablet}) {
    padding: 2rem;
  }
`;

export default DashboardPage;
