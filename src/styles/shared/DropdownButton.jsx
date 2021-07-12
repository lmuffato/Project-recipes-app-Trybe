import styled from 'styled-components';
import { DropdownButton } from 'react-bootstrap';

const SharedDropdownButton = styled(DropdownButton)`
  > button {
    background: var(--red-first-color);
    border-color: var(--red-firts-color);
  }
`;

export default SharedDropdownButton;
