import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children?: ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => (props.primary ? '#00b9f5' : 'transparent')};
  color: ${(props) => (props.primary ? '#fff' : '#00b9f5')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  ${(props) =>
    props.size === 'small' &&
    css`
      padding: 6px 12px;
      font-size: 12px;
    `}
  ${(props) =>
    props.size === 'large' &&
    css`
      padding: 14px 28px;
      font-size: 20px;
    `}
  ${(props) =>
    (!props.size || props.size === 'medium') &&
    css`
      padding: 10px 20px;
    `}

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#e0e0e0')};
  }
`;

const Button: React.FC<ButtonProps> = ({
  primary,
  onClick,
  children,
  size,
}) => {
  return (
    <StyledButton primary={primary} onClick={onClick} size={size}>
      {children}
    </StyledButton>
  );
};

export default Button;
