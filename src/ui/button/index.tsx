import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { $primary, $primaryActive, $primaryHover } from '~styles/vars';
import './style.scss';
import { IButtonProps } from './types';

export const StyledButton = styled.button`
    display: inline-block;
    width: 100%;
    padding: 16px 36px;
    text-align: center;
    font-size: 17px;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
    background-color: ${$primary};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-style: normal;
    letter-spacing: 0;
    font-family: inherit;
    transition: background-color ease 0.2s;

    span {
        display: inline-block;
        vertical-align: bottom;
        font-weight: 800;
    }

    &:hover {
        background-color: ${$primaryHover};
    }

    &:active {
        background-color: ${$primaryActive};
    }

    &:disabled {
        opacity: 0.7;
        cursor: default;
    }

    &:hover.button:disabled,
    &:active.button:disabled {
        background-color: ${$primary};
        cursor: default;
    }
`;

function Button(props: IButtonProps): JSX.Element {
    const { className, onClick, type, disabled, children, testId = 'button' } = props;
    return (
        <StyledButton
            type={type ? type : 'button'}
            className={`button${className ? ` ${className}` : ''}`}
            onClick={onClick}
            disabled={disabled}
            data-testid={testId}
        >
            {children}
        </StyledButton>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    testId: PropTypes.string,
};

export default Button;
