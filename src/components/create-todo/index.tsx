/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addTodo } from '~app-state/todos/todosSlice';
import Button from '~ui/button';
import Input from '~ui/input';
import { $ipadPortrait } from '~styles/vars';
import './style.scss';

export const Form = styled.form`
    margin-bottom: 32px;
    @media (min-width: ${$ipadPortrait}) {
        display: flex;
        align-items: flex-start;
    }

    & .input {
        margin-bottom: 16px;
        @media (min-width: ${$ipadPortrait}) {
            margin-bottom: 0;
        }
    }

    & .button {
        @media (min-width: ${$ipadPortrait}) {
            flex-shrink: 0;
            width: auto;
            margin-left: 16px;
        }
    }
`;

function CreateTodo() {
    const dispatch = useDispatch();
    const [text, updateText] = React.useState<string>('');

    const createTodo = React.useCallback(
        (event: React.MouseEvent<HTMLInputElement>) => {
            event.preventDefault();
            if (text) {
                dispatch(addTodo({ text }));
            }
            updateText('');
        },
        [text, dispatch]
    );

    const onChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            updateText(event.target.value);
        },
        [updateText]
    );

    return (
        <Form>
            <Input
                placeholder="Write new task here..."
                value={text}
                onChange={onChange}
                id="new-todo-input"
                testId="todo-input"
            />
            <Button type="submit" onClick={createTodo} disabled={!text} testId="todo-create-btn">
                Add
            </Button>
        </Form>
    );
}

// export default CreateTodo;
export default React.memo(CreateTodo);
