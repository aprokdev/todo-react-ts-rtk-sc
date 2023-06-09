import React from 'react';
import { Provider } from 'react-redux';
import { act, create } from 'react-test-renderer';
import { setupStore } from '~app-state/store';
import TodosList from '../index';

const store = setupStore();

function TestTodosList() {
    return (
        <Provider store={store}>
            <TodosList />
        </Provider>
    );
}

describe('TodosList', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<TestTodosList />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
