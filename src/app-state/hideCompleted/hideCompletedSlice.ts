import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ISetHideCompletedPayload {
    checked: boolean;
}

export const hideCompletedSlice = createSlice({
    name: 'hideCompleted',
    initialState: false,
    reducers: {
        setHideCompleted: (state: boolean, action: PayloadAction<ISetHideCompletedPayload>) => {
            return action.payload.checked;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setHideCompleted } = hideCompletedSlice.actions;

export default hideCompletedSlice.reducer;
