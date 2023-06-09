import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setHideCompleted } from '~app-state/hideCompleted/hideCompletedSlice';
import { RootState } from '~app-state/store';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';
import './style.scss';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-top: 52px;
    margin-right: 20px;
`;

function HideChecked() {
    const isCompletedHidden = useSelector((state: RootState) => state.hideCompleted);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <Checkbox
                checked={isCompletedHidden}
                onChange={(e) => dispatch(setHideCompleted({ checked: e.target.checked }))}
                id="#sort-checked"
                testId="sort-checked"
            />
            <Label htmlFor="#sort-checked">Hide completed</Label>
        </Wrapper>
    );
}

// export default HideChecked;
export default React.memo(HideChecked);
