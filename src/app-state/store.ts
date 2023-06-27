import hideCompletedReducer from '@app-state/hideCompleted/hideCompletedSlice';
import sortingTitleReducer from '@app-state/sortingTitle/sortingTitleSlice';
import todosReducer from '@app-state/todos/todosSlice';
import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    todos: todosReducer,
    sortingTitle: sortingTitleReducer,
    hideCompleted: hideCompletedReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
        preloadedState,
    });
    // add subscribtion on every action:
    store.subscribe(() => {
        localStorage.setItem('listTodos', JSON.stringify(store.getState().todos));
        localStorage.setItem('sortingTitle', JSON.stringify(store.getState().sortingTitle));
    });

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
