/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~app-state/store';
import { ITodo } from '~src/todo-context/types';
import TodoItem from '~components/todo-item/index';
import './style.scss';

function TodosList(): JSX.Element {
    const listTodos = useSelector((state: RootState) => state.todos);
    const isCompletedHidden = useSelector((state: RootState) => state.hideCompleted);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            {!isCompletedHidden &&
                Array.isArray(listTodos) &&
                listTodos.map((todo: ITodo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            dispatch={dispatch}
                            testId={String(todo.id)}
                        />
                    );
                })}
            {isCompletedHidden &&
                Array.isArray(listTodos) &&
                listTodos
                    .filter(({ isCompleted }: { isCompleted: boolean }) => !isCompleted)
                    .map((todo: ITodo) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                dispatch={dispatch}
                                testId={String(todo.id)}
                            />
                        );
                    })}
        </React.Fragment>
    );
}

// export default TodosList;
export default React.memo(TodosList);
