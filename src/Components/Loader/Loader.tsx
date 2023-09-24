/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface ILoaderProps {
  size?: string;
}

const loaderStyles = css`
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    border: 0.4rem solid var(--blue2);
    border-top: 0.4rem solid var(--blue3);
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    animation: spin 2s linear infinite;
  }

  .loader__small {
    width: 1.6rem;
    height: 1.6rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FC<ILoaderProps> = ({ size }) => {
  return (
    <div css={loaderStyles} className='loader-container'>
      <div className={`loader ${`loader__${size}`}`}></div>
    </div>
  );
};

export default Loader;
