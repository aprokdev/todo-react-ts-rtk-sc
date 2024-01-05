import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ClearLocalStorage from '@components/clear-local-storage';
import CreateTodo from '@components/create-todo';
import HideChecked from '@components/hide-checked';
import Sorting from '@components/sorting';
import TodosList from '@components/todos-list';
import reduxLogo from '@img/redux.svg';
import styledLogo from '@img/styled-components-logo.png';
import tsLogo from '@img/tsLogo.svg';
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

export const Link = styled.a`
    display: block;
    width: 50px;
    height: 50px;
    margin-left: 20px;
`;

export const Image = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;

export const Bottom = styled.div`
    margin-top: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function App() {
    const listTodos = useSelector((state: RootState) => state.todos);

    const isCheckedTodos = React.useMemo(() => {
        return (
            Array.isArray(listTodos) &&
            listTodos.length > 0 &&
            listTodos.find(({ isCompleted }) => isCompleted)
        );
    }, [listTodos]);

    return (
        <Wrap>
            <Head>
                <Title className="app__title">Todo List</Title>
                <Link
                    href="https://www.typescriptlang.org/"
                    className="app__link"
                    target="__blank"
                    rel="noreferer noopener"
                >
                    <Image src={tsLogo} alt="" />
                </Link>
                <Link
                    href="https://redux-toolkit.js.org/"
                    className="app__link"
                    target="__blank"
                    rel="noreferer noopener"
                >
                    <Image src={reduxLogo} alt="" />
                </Link>
                <Link
                    href="https://styled-components.com/"
                    className="app__link"
                    target="__blank"
                    rel="noreferer noopener"
                >
                    <Image src={styledLogo} alt="" />
                </Link>
            </Head>
            <CreateTodo />
            {listTodos.length > 0 && <Sorting />}
            <TodosList />
            <Bottom>
                {Array.isArray(listTodos) && listTodos.length > 0 && (
                    <HideChecked disabled={!isCheckedTodos} />
                )}
                <ClearLocalStorage />
            </Bottom>
        </Wrap>
    );
}

export default React.memo(App);
