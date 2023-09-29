/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, KeyboardEvent, Ref } from 'react';

import '../../_variables.css';

interface InputProps {
  label?: string;
  classname?: string;
  type?: string;
  value?: string;
  readOnly?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  suffix?: any;
  error?: string | undefined;
  borderbottom?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onSuffix?: () => void;
}

const inputStyles = css`
  display: flex;
  flex-direction: column;
  .input-container {
    display: flex;
    position: relative;
    /* flex-direction: column; */
    justify-content: space-between;
    border: 1px solid var(--grey);
    border-radius: 0.1rem;
    align-items: center;

    input {
      padding: 0.5rem;
      z-index: 10;
      background-color: transparent;
      outline: none;
      border: none;
      font-size: var(--font5);
      letter-spacing: 0.05rem;
      flex: 1;
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
      padding: 2.5rem 0.5rem 0.3rem 0.8rem;
      /* height: 2rem; */
    }

    input:focus + .input-label,
    .input-has-value + .input-label {
      font-size: var(--font2);
      top: 1.5rem;
      font-weight: var(--regular);
    }

    .suffix {
      width: 4rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
    }

    .disabled {
      cursor: not-allowed;
    }
  }
  .border-bt {
    border: none;
    border-bottom: 1px solid var(--grey);
  }
  .error-input {
    border-color: var(--red);
  }

  .error-msg {
    color: var(--red);
    font-size: x-small;
    margin-left: 0.5rem;
  }
`;

const Input = React.forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const {
      label,
      classname = '',
      type = 'text',
      value = '',
      readOnly = false,
      id = '',
      name = '',
      disabled = false,
      suffix,
      error,
      borderbottom = false,
      onChange = () => {},
      onClick = () => {},
      onKeyDown = () => {},
      onFocus = () => {},
      onSuffix = () => {},
    } = props;
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const inputClassName = `${label ? 'input-has-label' : ''} ${
      inputValue ? 'input-has-value' : ''
    } ${disabled ? 'disabled' : ''}`;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (onChange) onChange(e);
    };

    const onSuffixHandler = () => {
      onSuffix();
    };

    return (
      <div css={inputStyles}>
        <div
          className={`input-container ${classname} ${
            borderbottom ? 'border-bt' : ''
          } ${error ? 'error-input' : ''}`}
        >
          <input
            type={type}
            value={inputValue}
            ref={ref}
            className={inputClassName}
            readOnly={readOnly}
            onChange={onChangeHandler}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            id={id}
            name={name}
            disabled={disabled}
            prefix='-'
          />
          {label && <label className='input-label'>{label}</label>}
          {suffix && (
            <span className='suffix' onClick={onSuffixHandler}>
              {suffix}
            </span>
          )}
        </div>
        {error && <div className='error-msg'>{error}</div>}
      </div>
    );
  }
);

export default Input;
