import React from 'react';
import styled from '@emotion/styled';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  color: var(--white);
  background-color: var(--purple);
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <h1>Contacts App</h1>
    </StyledHeader>
  );
};

export default Header;
