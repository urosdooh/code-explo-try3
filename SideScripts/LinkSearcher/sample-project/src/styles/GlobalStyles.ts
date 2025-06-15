import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`;
