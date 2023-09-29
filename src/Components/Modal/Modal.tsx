import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

const StyledModal = styled.div`
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  .modal-btns {
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
  }
`;

interface IModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <StyledModal>
      <div className='modal-overlay'>
        <div className='modal'>
          {onClose && (
            <button className='close-button' onClick={onClose}>
              &times;
            </button>
          )}
          {children}
        </div>
      </div>
    </StyledModal>,
    // @ts-ignore
    document.getElementById('root')
  );
};

export default Modal;
