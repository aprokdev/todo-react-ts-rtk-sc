/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { $colorSecondary, $primary } from '@styles/vars';
import { IconCheck } from './icon';
import { ICheckboxProps } from './types';

export const Wrapper = styled.span`
    display: inline-block;
    vertical-align: top;
    margin-right: 16px;
`;

export const Label = styled.label`
    display: block;
    width: 24px;
    height: 24px;
    background-color: ${$colorSecondary};
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    transition: background-color ease 0.2s;

    .icon {
        display: block;
        width: 24px;
        height: 24px;
        line-height: 24px;
    }
`;

export const CheckboxInput = styled.input`
    display: none;
    &:checked + .icon {
        display: block;
    }

    &:checked + ${Label} {
        background-color: ${$primary};
    }
`;

function Checkbox(props: ICheckboxProps): JSX.Element {
    const { className, checked, onChange, id, testId = 'checkbox' } = props;
    const inputRef = React.useRef(null);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLLabelElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            inputRef.current.click();
        }
    }, []);

    return (
        <Wrapper className={`checkbox${className ? ` ${className}` : ''}`} data-testid={testId}>
            <CheckboxInput
                type="checkbox"
                checked={checked}
                id={id}
                onChange={onChange}
                ref={inputRef}
                data-testid={`${testId}-input`}
            />
            <Label htmlFor={id} tabIndex={0} onKeyDown={onKeyDown} data-testid={`${testId}-square`}>
                {checked && <IconCheck color="#fff" />}
            </Label>
        </Wrapper>
    );
}

Checkbox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    testId: PropTypes.string,
};

export default Checkbox;
