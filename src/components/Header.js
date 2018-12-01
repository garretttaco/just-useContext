import React from "react";
import styled from "@emotion/styled";
import theme from "../theme";

const Header = styled.header`
  background: ${theme.primary};
  box-shadow: inset 0 -1px 0 #026138;
  padding: 10px;
  color: ${theme.light};
  font-weight: 100;
`;

export default () => (
  <Header>
    <h1>Just useContext(ReactStateManagement)</h1>
  </Header>
);
