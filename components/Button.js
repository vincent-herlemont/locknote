import React from "react";
import styled from "styled-components";

export default styled.button`
  background: ${(props) => props.theme.light};
  color: inherit;
  border: none;
  padding: 0.7em;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border: ${(props) => props.theme.color.dark} solid
    ${(props) => props.theme.border};
  box-shadow: 0.1em 0.1em 0px 0px ${(props) => props.theme.color.dark};

  &:active {
    transform: translate(0.1em, 0.1em);
    box-shadow: 0px 0px 0px 0px ${(props) => props.theme.light};
  }

  &:disabled {
    opacity: 70%;
    cursor: unset;
  }
`;
