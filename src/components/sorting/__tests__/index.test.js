import React from 'react';
import { Provider } from 'react-redux';
import { act, create } from 'react-test-renderer';
import { setupStore } from '~app-state/store';
import Sorting from '../index';

const store = setupStore();

function Test() {
    return (
        <Provider store={store}>
            <Sorting />
        </Provider>
    );
}

describe('Sorting', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<Test />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
