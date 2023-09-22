/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { clearLocalStorage } from '@app-state/isSavedTodos/isSavedTodosSlice';
import { RootState } from '@app-state/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '@ui/button';
import { $ipadPortrait } from '@styles/vars';

export const Wrap = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
`;

export const ClearLocalStorageButton = styled(Button)`
    width: 150px;
    background-color: black;
    & > .clear-local-storage__mobile {
        display: inline;
    }
    & > .clear-local-storage__desktop {
        display: none;
    }
    @media (min-width: ${$ipadPortrait}) {
        width: 224px;
        & > .clear-local-storage__mobile {
            display: none;
        }
        & > .clear-local-storage__desktop {
            display: inline;
        }
    }
    &:hover,
    &:active {
        background-color: black;
    }
`;

function ClearLocalStorage() {
    const isSavedTodos = useSelector((state: RootState) => state.isSavedTodos);
    const dispatch = useDispatch();

    return (
        <Wrap>
            {isSavedTodos && (
                <ClearLocalStorageButton
                    type="submit"
                    onClick={() => dispatch(clearLocalStorage())}
                    disabled={false}
                    testId="clear-local-storage"
                >
                    Clear <span className="clear-local-storage__desktop">Local Storage</span>{' '}
                    <span className="clear-local-storage__mobile">LS</span>
                </ClearLocalStorageButton>
            )}
        </Wrap>
    );
}

// export default ClearLocalStorage;
export default React.memo(ClearLocalStorage);
