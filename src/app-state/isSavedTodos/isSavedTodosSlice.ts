import {
    sortByAlphabet,
    sortByAlphabetReverse,
    sortByDate,
} from '@app-state/sortingTitle/sortingTitleSlice';
import { addTodo, checkTodo, deleteTodo, editTodo } from '@app-state/todos/todosSlice';
import { createSlice } from '@reduxjs/toolkit';
import { LS_TODOS_LIST_NAME } from '../todos/todosSlice';

export type isSavedTodosState = boolean;

export interface isSavedTodosActionPayload {
    value: boolean;
}

export const isSavedTodosSlice = createSlice({
    name: 'isSavedTodos',
    initialState: () => {
        const LSTodos = JSON.parse(localStorage.getItem(LS_TODOS_LIST_NAME)) || [];
        return Array.isArray(LSTodos) ? Boolean(LSTodos.length) : false;
    },
    reducers: {
        clearLocalStorage: () => {
            localStorage.clear();
            return false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodo, () => {
                return true;
            })
            .addCase(checkTodo, () => {
                return true;
            })
            .addCase(deleteTodo, () => {
                return true;
            })
            .addCase(editTodo, () => {
                return true;
            })
            .addCase(sortByDate, () => {
                return true;
            })
            .addCase(sortByAlphabet, () => {
                return true;
            })
            .addCase(sortByAlphabetReverse, () => {
                return true;
            })
            // and provide a default case if no other handlers matched
            .addDefaultCase((state, action) => state);
    },
});

// Action creators are generated for each case reducer function
export const { clearLocalStorage } = isSavedTodosSlice.actions;

export default isSavedTodosSlice.reducer;
