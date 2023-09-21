import { AppDispatch } from '@src/app-state/store';
import { ITodo } from '@src/app-state/todos/todosSlice';

export interface ITodoProps {
    todo: ITodo;
    dispatch: AppDispatch;
    testId: string;
}
