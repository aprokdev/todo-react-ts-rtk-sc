import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import styled from 'styled-components';

export const StyledTextareaAutosize = styled(TextareaAutosize)`
    width: 100%;
    height: 24px;
    margin-bottom: 0;
    padding: 0 2px 0 0;
    font-size: 16px;
    line-height: 24px;
    border: none;
    border-radius: 0;
    outline: none;
    resize: none;

    &:focus {
        border: none;
    }
`;

// The same as TextareaAutosize, but with moving caret to the end after focus()
function TextAreaAutosize(props: TextareaAutosizeProps) {
    const textAreaRef = React.useRef(null);

    React.useEffect(() => {
        if (!textAreaRef.current) return;
        const el = textAreaRef.current;
        if (typeof el.selectionStart == 'number') {
            el.selectionStart = el.selectionEnd = el.value.length;
        } else if (typeof el.createTextRange != 'undefined') {
            el.focus();
            const range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    }, []);

    return typeof jest !== 'undefined' ? (
        <textarea ref={(tag) => (textAreaRef.current = tag)} {...props} />
    ) : (
        <StyledTextareaAutosize ref={(tag) => (textAreaRef.current = tag)} {...props} />
    );
}

export default TextAreaAutosize;
