import PropTypes from 'prop-types';
// import React, { LegacyRef } from 'react';
import React from 'react';
import styled from 'styled-components';
import { $primary } from '~styles/vars';
import './style.scss';
import { IInputProps } from './types';

export const StyledInput = styled.input<IInputProps>`
    display: block;
    width: 100%;
    height: 56px;
    margin-bottom: 32px;
    padding: 0 16px;
    font-size: 16px;
    line-height: 52px;
    border: 2px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
        border: 2px solid ${$primary};
    }
`;

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
    (props, ref: React.RefObject<HTMLInputElement>) => {
        const {
            value,
            className,
            onChange,
            onBlur,
            id,
            type = 'text',
            placeholder,
            testId = 'input',
        } = props;
        return (
            <StyledInput
                type={type}
                value={value}
                placeholder={placeholder}
                className={`input${className ? ` ${className}` : ''}`}
                onChange={onChange}
                onBlur={onBlur}
                id={id}
                ref={ref}
                data-testid={testId}
            />
        );
    }
);

Input.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    testId: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;
