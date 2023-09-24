/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';

import '../../_variables.css';

interface InputProps {
  label?: string;
  classname?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onKeyDown?: () => void;
  readOnly?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
}

const inputStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    padding: 0.5rem;
    z-index: 10;
    background-color: transparent;
    border: 1px solid var(--grey);
    outline: none;
    font-size: var(--font4);
    border-radius: 0.1rem;
    letter-spacing: 0.05rem;
  }

  .input-label {
    position: absolute;
    top: 50%;
    left: 0.8rem;
    z-index: -1;
    transition: top 0.5s, font-size 0.5s, left 0.5s;
    font-size: var(--font3);
    color: var(--blueGrey);
    font-weight: var(--semiBold);
    transform: translate(0%, -50%);
  }

  .input-has-label {
    padding: 1rem 0.5rem 0.3rem 0.5rem;
    height: 2rem;
  }

  input:focus + .input-label,
  .input-has-value + .input-label {
    font-size: var(--font2);
    top: 0.8rem;
    font-weight: var(--regular);
  }
`;

const Input: React.FC<InputProps> = ({
  label,
  classname = '',
  type = 'text',
  value = '',
  onChange = () => {},
  onClick = () => {},
  onKeyDown = () => {},
  readOnly = false,
  id = '',
  name = '',
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const inputClassName = `${label ? 'input-has-label' : ''} ${
    inputValue ? 'input-has-value' : ''
  }`;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div css={inputStyles} className={classname}>
      <input
        type={type}
        value={inputValue}
        className={inputClassName}
        readOnly={readOnly}
        onChange={onChangeHandler}
        onClick={onClick}
        onKeyDown={onKeyDown}
        id={id}
        name={name}
        disabled={disabled}
      />
      {label && <label className='input-label'>{label}</label>}
    </div>
  );
};

export default Input;
