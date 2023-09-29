import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Loader from '../Loader';

interface ButtonProps {
  type?: 'primary' | 'link';
  htmlType?: 'button' | 'submit';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children?: ReactNode;
  classname?: string;
  loading?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.div<ButtonProps>`
  display: flex;
  width: fit-content;
  button {
    background-color: var(--blue3);
    color: var(--white);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .small {
    padding: 6px 12px;
    font-size: 12px;
  }
  .medium {
    padding: 10px 20px;
  }
  .large {
    padding: 14px 28px;
    font-size: 20px;
  }

  .link {
    padding: 1.5rem 0;
    background-color: transparent;
    color: var(--grey);
  }

  &button:hover {
    background-color: ${(props) => (props.type ? '#0056b3' : '#e0e0e0')};
  }

  .disabled {
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({
  onClick = () => {},
  children,
  size = 'medium',
  type,
  htmlType = 'button',
  classname,
  loading = false,
  disabled = false,
}) => {
  const classnames = `${type} ${size} ${classname} ${
    disabled ? 'disabled' : ''
  }`;

  const onClickHandler = () => {
    if (disabled || loading) return;
    onClick();
  };

  return (
    <StyledButton onClick={onClickHandler} size={size} className={classnames}>
      <button className={classnames} type={htmlType}>
        {!loading && children}
        {loading && <Loader size='small' />}
      </button>
    </StyledButton>
  );
};

export default Button;
