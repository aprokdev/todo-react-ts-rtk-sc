/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
    sortByAlphabet,
    sortByAlphabetReverse,
    sortByDate,
} from '@app-state/sortingTitle/sortingTitleSlice';
import { sortingText } from '@app-state/sortingTitle/sortingTitleSlice';
import { RootState } from '@app-state/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { $desktopBreakpoint } from '@styles/vars';

export const SortingWrap = styled.div`
    display: flex;
    margin-bottom: 32px;
`;

export const SortingTitle = styled.h3`
    font-size: 22px;
    line-height: 36px;
    cursor: pointer;
    // @media (min-width: ${$desktopBreakpoint}) {
    //     font-size: 36px;
    //     font-weight: 400;
    //     line-height: 40px;
    // }
`;

function Sorting() {
    const sortingTitle = useSelector((state: RootState) => state.sortingTitle);
    const dispatch = useDispatch();
    const onHeaderlickHeader = React.useCallback(() => {
        if (sortingTitle === sortingText.CREATION_DATE) {
            dispatch(sortByAlphabet());
        }
        if (sortingTitle === sortingText.ALPHABET) {
            dispatch(sortByAlphabetReverse());
        }
        if (sortingTitle === sortingText.ALPHABET_REVERSE) {
            dispatch(sortByDate());
        }
    }, [dispatch, sortingTitle]);

    const headerRef = React.useRef(null);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLHeadElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            headerRef.current.click();
        }
    }, []);

    return (
        <SortingWrap className="sorting">
            <SortingTitle
                onClick={onHeaderlickHeader}
                tabIndex={0}
                ref={headerRef}
                onKeyDown={onKeyDown}
                className="sorting__title"
            >
                ✨ Sort tasks by: {sortingTitle}
            </SortingTitle>
        </SortingWrap>
    );
}

// export default Sorting;
export default React.memo(Sorting);
