import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import Button from '../Button';

interface IToastProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error';
}

const StyledToast = styled.div`
  .toast {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }

  .success {
    background-color: #3ce33c;
  }
`;

const Toast = ({ message, onClose, type = 'success' }: IToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const classname = type === 'success' ? 'success' : 'error';

  return (
    <StyledToast>
      <div className={`toast ${classname}`}>
        <p>{message}</p>
        <Button classname='close-button' onClick={handleClose}>
          &times;
        </Button>
      </div>
    </StyledToast>
  );
};

export default Toast;
