import React, { useState, useEffect, useContext, Fragment } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Button from "./Button";
import EditorContext from "../contexts/EditorContext";
const EditorMARKDOW = dynamic(() => import("./EditorMARKDOW"), { ssr: false });

const Menu = ({ className }) => {
  const {
    data: { editing },
    dispatch,
  } = useContext(EditorContext);

  return (
    <div className={className}>
      <div className={"right"}>
        {editing && (
          <Button onClick={() => dispatch({ type: "cancel" })}>Cancel</Button>
        )}
      </div>
      <div className={"left"}>
        {editing && (
          <Fragment>
            <Button onClick={() => dispatch({ type: "save" })}>Save</Button>
            <Button onClick={() => dispatch({ type: "delete" })}>Delete</Button>
          </Fragment>
        )}
        {!editing && (
          <Button onClick={() => dispatch({ type: "edit" })}>Edit</Button>
        )}
      </div>
    </div>
  );
};
const StyledMenu = styled(Menu)`
  display: flex;

  ${Button} {
    margin: 0.2rem;
  }

  padding: 0.2rem;

  .right {
    flex: 1;
  }
`;

const Title = ({ className }) => {
  const {
    data: {
      note: { title },
      editing,
    },
    dispatch,
  } = useContext(EditorContext);

  return (
    <div className={className}>
      <input
        type="text"
        disabled={!editing}
        value={title}
        onChange={(e) => {
          dispatch({ type: "update_title", title: e.target.value });
        }}
      />
    </div>
  );
};

const StyledTitle = styled(Title)`
  width: 100%;
  padding: 0.3em;
  input {
    width: 100%;
    font-size: 2rem;
    border: none;
    background-image: none;
    background-color: transparent;
    box-shadow: none;
  }
  input:focus {
    outline: none !important;
  }
  input:disabled {
    color: black;
  }
`;

const Editor = ({ className }) => {
  const {
    data: { note, opening, saving },
  } = useContext(EditorContext);

  return (
    <div className={className}>
      {(opening || saving) && (
        <div className={"loader"}>
          <img src="/img/loader.gif" />
          <div>
            {opening && "decryption"} {saving && "encryption"}...{" "}
          </div>
        </div>
      )}
      {note?.id && (
        <Fragment>
          <StyledTitle />
          <div className={"editor"}>
            <EditorMARKDOW />
          </div>
          <StyledMenu />
        </Fragment>
      )}
    </div>
  );
};

export default styled(Editor).attrs((props) => ({
  border: `${props.theme.color.dark}  solid ${props.theme.border}`,
}))`
  border-bottom: ${(props) => props.border};
  border-right: ${(props) => props.border};
  border-top: ${(props) => props.border};

  position: relative;

  display: flex;
  flex-direction: column;

  .editor {
    flex: 1;
  }

  .loader {
    position: absolute;
    opacity: 40%;
    background-color: white;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;

    img {
      width: 5em;
      height: 5em;
    }
  }
`;
