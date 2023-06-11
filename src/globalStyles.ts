import { createGlobalStyle } from 'styled-components';
import { $desktopBreakpoint, $text01 } from './styles/vars';

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -moz-osx-font-smoothing: grayscale;
}

ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}

a,
button,
label,
[role='button'] {
    // outline: none;
    outline-color: blue;
}

input::placeholder,
textarea::placeholder {
    color: #909090;
}

input:focus::placeholder,
textarea:focus::placeholder {
    color: transparent;
}

main,
.main {
    display: block;

    // margin-top: 56px;
    min-width: 320px;
    min-height: calc(100vh + 1px);
    padding-top: 56px;

    // min-height: calc(100vh - 55px);
    @media (min-width: ${$desktopBreakpoint}) {
        padding-top: 80px;

        // margin-top: 80px;
        // min-height: calc(100vh + 1px);
    }

    .skeleton-overwrite {
        line-height: normal !important;
    }
}

h1,
h2,
h3,
h4,
h5,
h6 {
    // font-weight: 800;
    color: ${$text01};
}

h1 {
    font-size: 42px;
    // font-size: 68px;
    // line-height: 28px;
    // line-height: 68px;
    line-height: 50px;
    @media (min-width: ${$desktopBreakpoint}) {
        font-size: 50px;
        font-size: 68px;
        font-weight: 400;
        line-height: 56px;
        line-height: 68px;
    }
}

h2 {
    font-size: 20px;
    line-height: 24px;
    @media (min-width: ${$desktopBreakpoint}) {
        font-size: 44px;
        font-weight: 400;
        line-height: 48px;
    }
}

h3 {
    // font-size: 17px;
    // line-height: 24px;
    font-size: 24px;
    line-height: 36px;
    @media (min-width: ${$desktopBreakpoint}) {
        font-size: 36px;
        font-weight: 400;
        line-height: 40px;
    }
}

h4 {
    font-size: 15px;
    line-height: 20px;
    @media (min-width: ${$desktopBreakpoint}) {
        font-size: 28px;
        font-weight: 400;
        line-height: 32px;
    }
}

h5 {
    font-size: 13px;
    line-height: 20px;
    @media (min-width: ${$desktopBreakpoint}) {
        font-size: 24px;
        font-weight: 400;
        line-height: 28px;
    }
}

h6 {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
}

.body-xl-bold,
.body-xl,
.body-l-bold,
.body-l,
.body-m-bold,
.body-m,
.body-s-bold,
.body-s,
.body-xs-bold,
.body-xs {
    color: ${$text01};
}

.body-xl-bold {
    font-size: 19px;
    font-weight: 800;
    line-height: 28px;
}

.body-xl {
    font-size: 19px;
    font-weight: 400;
    line-height: 28px;
}

.body-l-bold {
    font-size: 17px;
    font-weight: 800;
    line-height: 28px;
}

.body-l {
    font-size: 17px;
    line-height: 28px;
}

.body-m-bold {
    font-size: 16px;
    font-weight: 800;
    line-height: 24px;
}

.body-m {
    font-size: 16px;
    line-height: 24px;
}

.body-s-bold {
    font-size: 13px;
    font-weight: 800;
    line-height: 20px;
}

.body-s {
    font-size: 13px;
    line-height: 20px;
}

.body-xs-bold {
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
}

.body-xs {
    font-size: 11px;
    line-height: 16px;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

`;

export default GlobalStyle;
