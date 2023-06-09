import { createSlice } from '@reduxjs/toolkit';

export type SortingTitleType = string;

export const sortingText = {
    CREATION_DATE: 'CREATION DATE',
    ALPHABET: 'ALPHABET',
    ALPHABET_REVERSE: 'ALPHABET-REVERSE',
};

export const sortingTitleSlice = createSlice({
    name: 'sortingTitle',
    initialState: () =>
        JSON.parse(localStorage.getItem('sortingTitle')) || sortingText.CREATION_DATE,
    reducers: {
        sortByDate: () => {
            return sortingText.CREATION_DATE;
        },
        sortByAlphabet: () => {
            return sortingText.ALPHABET;
        },
        sortByAlphabetReverse: () => {
            return sortingText.ALPHABET_REVERSE;
        },
    },
});

// Action creators are generated for each case reducer function
export const { sortByDate, sortByAlphabet, sortByAlphabetReverse } = sortingTitleSlice.actions;

export default sortingTitleSlice.reducer;
