import { setHideCompleted } from '@app-state/hideCompleted/hideCompletedSlice';
import { RootState } from '@app-state/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Checkbox from '@ui/checkbox';
import Label from '@ui/label';
import { IHideCheckedProps } from './types';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-top: 52px;
    margin-right: 20px;
    .checkbox,
    .label {
        transition: all ease 0.2s;
    }
`;

function HideChecked({ disabled }: IHideCheckedProps) {
    const isCompletedHidden = useSelector((state: RootState) => state.hideCompleted);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <Checkbox
                checked={isCompletedHidden}
                onChange={(e) => dispatch(setHideCompleted({ checked: e.target.checked }))}
                id="#sort-checked"
                testId="sort-checked"
                disabled={disabled}
            />
            <Label htmlFor="#sort-checked" disabled={disabled}>
                Hide completed
            </Label>
        </Wrapper>
    );
}

// export default HideChecked;
export default React.memo(HideChecked);
