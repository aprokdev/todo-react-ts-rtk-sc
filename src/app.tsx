import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CreateTodo from '~components/create-todo';
import HideChecked from '~components/hide-checked';
import Sorting from '~components/sorting';
import TodosList from '~components/todos-list';
import icon from '~img/icon.svg';
import reduxLogo from '~img/redux-logo.png';
import styledLogo from '~img/styled-components-logo.png';
import { RootState } from './app-state/store';
import { $ipadPortrait } from './styles/vars';

// function WrapComponent({ children }: { children: React.JSX.Element[] }) {
//     const Wrap = styled.div`
//         width: 100%;
//         min-height: calc(100vh + 1px);
//         margin: 0 auto;
//         padding: 52px 16px;

//         @media (min-width: ${$ipadPortrait}) {
//             width: 800px;
//         }
//     `;

//     return <Wrap>{children}</Wrap>;
// }

// const Wrap = React.memo(WrapComponent);

const Wrap = styled.div`
    width: 100%;
    min-height: calc(100vh + 1px);
    margin: 0 auto;
    padding: 52px 16px;

    @media (min-width: ${$ipadPortrait}) {
        width: 800px;
    }
`;

export const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
`;

export const Title = styled.h1`
    font-size: 36px;
    line-height: 50px;
    text-align: center;
    @media (min-width: ${$ipadPortrait}) {
        font-size: 50px;
        line-height: 50px;
    }
`;

export const Image = styled.img<{ reduxImage?: boolean }>`
    display: block;
    width: ${({ reduxImage }) => (reduxImage ? '54px' : '50px')};
    height: 50px;
    margin-left: 20px;
    object-fit: ${({ reduxImage }) => (reduxImage ? 'fill' : 'cover')};
`;

function App() {
    const listTodos = useSelector((state: RootState) => state.todos);

    return (
        <Wrap>
            <Head>
                <Title>Todo List</Title>
                <Image src={icon} alt="" />
                <Image src={reduxLogo} alt="" reduxImage />
                <Image src={styledLogo} alt="" />
            </Head>
            <CreateTodo />
            {listTodos.length > 0 && <Sorting />}
            <TodosList />
            {Array.isArray(listTodos) &&
                listTodos.length > 0 &&
                listTodos.find(({ isCompleted }) => isCompleted) && <HideChecked />}
        </Wrap>
    );
}

export default React.memo(App);
