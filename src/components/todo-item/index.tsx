/* eslint-disable jsx-a11y/no-autofocus */
import PropTypes from 'prop-types';
import React, { ChangeEvent, MouseEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import 'react-intersection-observer/test-utils';
import styled from 'styled-components';
import { checkTodo, deleteTodo, editTodo } from '~app-state/todos/todosSlice';
import { $ipadPortrait, $primary, $primaryActive, $text01 } from '~src/styles/vars';
import { ITodo } from '~src/todo-context/types';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';
import TextareaAutosize from '~ui/textarea-autosize';
import './style.scss';
import { ITodoProps } from './type';

export const Wrapper = styled.div<{ isVisible: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 0;
    line-height: 24px;
    border-bottom: 1px solid #eee;
    transition: ease-in 0.5s;
    top: ${({ isVisible }) => (isVisible ? '0' : '30px')};
    opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

export const CheckGroup = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-right: 20px;
`;

export const Created = styled.span`
    display: none;
    flex-shrink: 0;
    width: 130px;
    text-align: right;
    font-size: 12px;
    line-height: 24px;
    color: #000;
    @media (min-width: ${$ipadPortrait}) {
        display: block;
    }
`;

export const Separator = styled.span`
    margin-bottom: 3px;
    color: ${$text01};
`;

export const ActionButton = styled.button`
    padding: 0 8px;
    font-weight: 700;
    line-height: 24px;
    color: ${$primary};
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:active {
        color: ${$primaryActive};
    }
`;

function TodoItem({ todo, dispatch, testId }: ITodoProps): JSX.Element {
    const { id, label, isCompleted, created }: ITodo = todo;
    const [editing, setEditing] = React.useState(false);
    const [value, setValue] = React.useState(label);

    const { ref, inView } = useInView({
        threshold: 0.005,
    });
    const flagRef = React.useRef<boolean>(false);
    // let changableClasses = 'todo-item--invisible';
    let isVisible = false;
    if (inView || flagRef.current) {
        // changableClasses = 'todo-item--visible';
        isVisible = true;
        flagRef.current = true;
    }

    const onBlurInput = React.useCallback(() => {
        // dispatch({ type: actionTypes.EDIT_TODO, text: value, id });
        dispatch(editTodo({ id, text: value }));
        setEditing(false);
    }, [id, value, setEditing, dispatch]);

    const date = React.useMemo(() => {
        const date = new Date(created);
        return date.toLocaleDateString('en-EN', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }, [created]);

    const onEditClick = React.useCallback(
        (event: MouseEvent): void => {
            event.preventDefault();
            setEditing(true);
        },
        [setEditing]
    );

    return (
        <Wrapper isVisible={isVisible} data-testid={testId} ref={ref}>
            <CheckGroup>
                <Checkbox
                    checked={isCompleted}
                    onChange={({ target }) =>
                        // dispatch({ type: actionTypes.CHECK_TODO, id, checked: target.checked })
                        dispatch(checkTodo({ id, checked: target.checked }))
                    }
                    id={String(id)}
                    testId={`${label}-cb`}
                />
                {editing ? (
                    <TextareaAutosize
                        value={value}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                            setValue(event.target.value)
                        }
                        onBlur={onBlurInput}
                        id={String(id)}
                        className="todo-item__input"
                        autoFocus
                        data-testid={`${label}-edit-field`}
                    />
                ) : (
                    <Label htmlFor={String(id)} testId={`${label}-label`}>
                        {label}
                    </Label>
                )}
            </CheckGroup>
            <Created>{date}</Created>
            <ActionButton
                type="button"
                onClick={onEditClick}
                disabled={false}
                data-testid={`${label}-edit`}
            >
                Edit
            </ActionButton>
            <Separator>/</Separator>
            <ActionButton
                type="button"
                onClick={() => dispatch(deleteTodo({ id }))}
                disabled={false}
                data-testid={`${label}-delete`}
            >
                Delete
            </ActionButton>
        </Wrapper>
    );
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        isCompleted: PropTypes.bool,
        created: PropTypes.number,
    }),
    dispatch: PropTypes.func,
    testId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// export default TodoItem;
export default React.memo(TodoItem);
