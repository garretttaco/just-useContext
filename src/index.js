import React from "react";
import ReactDOM from "react-dom";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import ComplicatedForm from "./ComplicatedForm";
import Header from "./components/Header";

ReactDOM.render(
  <>
    <Global
      styles={css`
        @font-face {
          font-family: "Space Mono, monospace";
          src: url("https://fonts.googleapis.com/css?family=Space+Mono");
        }

        * {
          font-family: "Space Mono", monospace;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
      `}
    />
    <ThemeProvider theme={theme}>
      <Header />
      <ComplicatedForm />
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
