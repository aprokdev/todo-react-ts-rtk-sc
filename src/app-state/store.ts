import hideCompletedReducer from '@app-state/hideCompleted/hideCompletedSlice';
import isSavedTodosReducer from '@app-state/isSavedTodos/isSavedTodosSlice';
import sortingTitleReducer from '@app-state/sortingTitle/sortingTitleSlice';
import todosReducer from '@app-state/todos/todosSlice';
import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    todos: todosReducer,
    sortingTitle: sortingTitleReducer,
    hideCompleted: hideCompletedReducer,
    isSavedTodos: isSavedTodosReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
        preloadedState,
    });

    let isSavedTodos = true;
    // adds subscribtion on every action:
    store.subscribe(() => {
        // saves current todos and sorting states to LocalStorage only if action type is not "clearLocalStorage":
        isSavedTodos = store.getState().isSavedTodos;
        if (isSavedTodos) {
            localStorage.setItem('listTodos', JSON.stringify(store.getState().todos));
            localStorage.setItem('sortingTitle', JSON.stringify(store.getState().sortingTitle));
        }
        isSavedTodos = true;
    });

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
