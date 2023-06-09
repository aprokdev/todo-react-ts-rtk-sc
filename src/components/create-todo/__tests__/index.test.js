import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { act, create } from 'react-test-renderer';
import { setupStore } from '~app-state/store';
import { renderWithProvider } from '~src/app-state/test-utils';
import CreateTodo from '../index';

const store = setupStore();

function TestCreateTodo() {
    return (
        <Provider store={store}>
            <CreateTodo />
        </Provider>
    );
}

describe('CreateTodo', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<TestCreateTodo />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test("CreateTodo's main input and button are exist in document", async () => {
        expect(screen.queryByTestId('todo-input')).toBeNull();
        expect(screen.queryByTestId('todo-create-btn')).toBeNull();
        renderWithProvider(<CreateTodo />);
        expect(screen.queryByTestId('todo-input')).toBeInTheDocument();
        expect(screen.queryByTestId('todo-create-btn')).toBeInTheDocument();
    });

    test('input onChange handler updates value in CreateTodo', async () => {
        const user = userEvent.setup();
        renderWithProvider(<CreateTodo />);
        const todoInput = screen.getByTestId('todo-input');
        expect(todoInput.value).toBe('');
        await user.type(todoInput, 't');
        expect(todoInput.value).toBe('t');
        await user.type(todoInput, 'e');
        expect(todoInput.value).toBe('te');
    });

    test('"create todo" button changes disabled state if input value changes', async () => {
        const user = userEvent.setup();
        renderWithProvider(<CreateTodo />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(addTodoBtn).toBeDisabled();
        expect(todoInput.value).toBe('');
        await user.type(todoInput, 't');
        expect(todoInput.value).toBe('t');
        expect(addTodoBtn).not.toBeDisabled();
        await user.type(todoInput, 't');
        expect(todoInput.value).toBe('tt');
        expect(addTodoBtn).not.toBeDisabled();
        await user.type(todoInput, '{Backspace}{Backspace}');
        expect(todoInput.value).toBe('');
        expect(addTodoBtn).toBeDisabled();
    });
});
