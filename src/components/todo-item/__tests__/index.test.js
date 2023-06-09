import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, create } from 'react-test-renderer';
import TodoItem from '../index';

const label = 'Test';

const todo = {
    id: 'todo-item',
    label: label,
    isCompleted: false,
    created: 1676239243831,
};

const props = {
    todo,
    dispatch: () => undefined,
};

function TestWrapper() {
    const [checked, setChecked] = React.useState();

    const props = React.useMemo(
        () => ({
            todo: {
                ...todo,
                isCompleted: checked,
            },
            dispatch: () => undefined,
        }),
        [checked]
    );

    return <TodoItem {...props} onChange={(e) => setChecked(e.target.checked)} />;
}
describe('TodoItem', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<TodoItem {...props} />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('click on the label checks the checkbox', async () => {
        const user = userEvent.setup();
        render(<TestWrapper />);
        const labelEl = screen.getByTestId(`${label}-label`);
        const checkbox = screen.getByTestId(`${label}-cb-input`);
        expect(checkbox).not.toBeChecked();
        await user.click(labelEl);
        expect(checkbox).toBeChecked();
    });

    test('label becomes editable after click on "Edit" button', async () => {
        const user = userEvent.setup();
        render(<TodoItem {...props} />);
        expect(screen.queryByTestId(`${label}-edit-field`)).toBeNull();
        const editBtn = screen.getByTestId(`${label}-edit`);
        await user.click(editBtn);
        expect(screen.queryByTestId(`${label}-edit-field`)).toBeInTheDocument();
        await user.type(screen.queryByTestId(`${label}-edit-field`), ' text');
        expect(screen.queryByTestId(`${label}-edit-field`).value).toBe('Test text');
    });

    test('after editing label value onBlur event calls dispatch callback', async () => {
        const mockDispatch = jest.fn();
        const user = userEvent.setup();
        render(<TodoItem {...props} dispatch={mockDispatch} />);
        await user.click(screen.getByText(/edit/i));
        await user.type(screen.queryByTestId(`${label}-edit-field`), ' text');
        expect(screen.queryByTestId(`${label}-edit-field`).value).toBe('Test text');
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        screen.queryByTestId(`${label}-edit-field`).blur();
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});
