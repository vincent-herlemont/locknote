import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import MainContext from "../contexts/MainContext";
import EditorContext from "../contexts/EditorContext";

const Header = () => {
  const { dispatch } = useContext(MainContext);
  const {
    data: { editing },
  } = useContext(EditorContext);
  return (
    <header>
      <Button disabled={editing} onClick={() => dispatch({ type: "create" })}>
        + New note
      </Button>
    </header>
  );
};

export default styled(Header)`
  header {
    padding: 0.2rem;
    display: flex;
    width: inherit;
  }
`;
