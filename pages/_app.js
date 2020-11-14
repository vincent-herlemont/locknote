import { Fragment } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import DefaultTheme from "../themes/DefaultTheme";
import { MainContextProvider } from "../contexts/MainContext";

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

html,
body,
body > div:first-child,
div#__next,
div#__next > div,
div#__next > div > div {
  height: 100%;
}
`;

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <MainContextProvider>
        <ThemeProvider theme={DefaultTheme}>
          <Component {...pageProps} />
          <GlobalStyle />
        </ThemeProvider>
      </MainContextProvider>
    </Fragment>
  );
}

export default MyApp;
