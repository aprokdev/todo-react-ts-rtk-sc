import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';
import { $text01 } from '@styles/vars';
import { ILabelProps } from './types';

export const StyledLabel = styled.label`
    display: inline-block;
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
    color: ${$text01};
    cursor: pointer;
    vertical-align: top;
    white-space: normal;

    &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

function Label(props: ILabelProps): JSX.Element {
    const { children, className, htmlFor, testId = 'label', disabled } = props;

    return (
        <StyledLabel
            className={`label${className ? ` ${className}` : ''}${disabled ? ' disabled' : ''}`}
            htmlFor={htmlFor}
            data-testid={testId}
        >
            {children}
        </StyledLabel>
    );
}

Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    testId: PropTypes.string,
};

export default Label;
