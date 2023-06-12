import { Action, AnyAction, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    sortByAlphabet,
    sortByAlphabetReverse,
    sortByDate,
} from '../sortingTitle/sortingTitleSlice';

export interface ITodo {
    id: string;
    label: string;
    isCompleted: boolean;
    created: number;
}

export type TodosState = ITodo[];

export interface IAddTodoPayload {
    text: string;
}

export interface ICheckTodoPayload {
    id: string;
    checked: boolean;
}

export interface IDeleteTodoPayload {
    id: string;
}

export interface IEditTodoPayload {
    id: string;
    text: string;
}

function findTodoIndex(state: TodosState, id: number | string): number | undefined {
    return state.findIndex((todo) => todo.id === id);
}
interface RejectedAction extends Action {
    error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('rejected');
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState: () => JSON.parse(localStorage.getItem('listTodos')) || [],
    reducers: {
        addTodo: (state: TodosState, action: PayloadAction<IAddTodoPayload>) => {
            state.push({
                id: String(Number(new Date())),
                label: action.payload.text.trim(),
                isCompleted: false,
                created: Number(new Date()),
            });
        },
        checkTodo: (state: TodosState, action: PayloadAction<ICheckTodoPayload>) => {
            const todoIndex = findTodoIndex(state, action.payload.id);
            state.splice(todoIndex, 1, {
                ...state[todoIndex],
                isCompleted: action.payload.checked,
            });
        },
        deleteTodo: (state: TodosState, action: PayloadAction<IDeleteTodoPayload>) => {
            state.splice(findTodoIndex(state, action.payload.id), 1);
        },
        editTodo: (state: TodosState, action: PayloadAction<IEditTodoPayload>) => {
            const todoIndex = findTodoIndex(state, action.payload.id);
            state.splice(todoIndex, 1, {
                ...state[todoIndex],
                label: action.payload.text,
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sortByDate, (state: TodosState) => {
                state.sort((a: ITodo, b: ITodo) => {
                    if (a.created < b.created) {
                        return -1;
                    }
                    return 1;
                });
            })
            .addCase(sortByAlphabet, (state: TodosState) => {
                state.sort((a: ITodo, b: ITodo) => {
                    if (a.label < b.label) {
                        return -1;
                    }
                    return 1;
                });
            })
            .addCase(sortByAlphabetReverse, (state: TodosState) => {
                state.sort((a: ITodo, b: ITodo) => {
                    if (a.label > b.label) {
                        return -1;
                    }
                    return 1;
                });
            })
            // You can match a range of action types
            .addMatcher(
                isRejectedAction,
                // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
                (state, action) => state
            )
            // and provide a default case if no other handlers matched
            .addDefaultCase((state, action) => state);
    },
});

// Action creators are generated for each case reducer function
export const { addTodo, checkTodo, deleteTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
