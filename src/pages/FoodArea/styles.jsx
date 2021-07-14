import styled from 'styled-components';
import { DropdownButton } from '../../styles/shared/MainDetails/MainDetailsStyles';

export const StyledDropDown = styled(DropdownButton)`
  > div {
    height: 200px;
    overflow: scroll;
  }
`;

export const MainContainerFoodArea = styled.main`
  > header {
    > div {
      > h1 {
        font-size: 1.5rem;
      }
    }
  } 
`;
