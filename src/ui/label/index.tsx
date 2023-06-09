import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';
import './style.scss';
import { ILabelProps } from './types';

export const StyledLabel = styled.label`
    display: inline-block;
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
    color: $text-01;
    cursor: pointer;
    vertical-align: top;
    white-space: normal;
`;

function Label(props: ILabelProps): JSX.Element {
    const { children, className, htmlFor, testId = 'label' } = props;

    return (
        <StyledLabel
            className={`label${className ? ` ${className}` : ''}`}
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
