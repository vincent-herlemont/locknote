import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import MainContext from "../contexts/MainContext";
import EditorContext from "../contexts/EditorContext";

const Item = ({ className, note, onClick, editing, selected }) => {
  return (
    <div className={className} onClick={(e) => !editing && onClick(e)}>
      {selected && <b>> {note.title}</b>}
      {!selected && note.title}
    </div>
  );
};

const StyledItem = styled(Item)`
  border-bottom: ${(props) => props.theme.color.dark} solid
    ${(props) => props.theme.border};
  padding: 0.7em;
  user-select: none;

  ${(props) => props.selected && `background-color:${props.theme.color.none};`}

  ${(props) => {
    return props.editing
      ? `
       opacity: 70%;`
      : `
    &:hover {
      background-color: ${props.theme.color.light};
      cursor: pointer;
    }`;
  }}
`;

const ListNote = ({ className }) => {
  const { data, dispatch } = useContext(MainContext);

  const {
    data: { editing },
  } = useContext(EditorContext);

  return (
    <div className={className}>
      {data.list
        .sort((n1, n2) => {
          if (n1.createdAt > n2.createdAt) {
            return -1;
          }
          if (n1.createdAt < n2.createdAt) {
            return 1;
          }
          return 0;
        })
        .map((note) => {
          return (
            <StyledItem
              key={note.id}
              note={note}
              selected={note.id === data.selectedNoteId}
              editing={editing}
              onClick={() => {
                dispatch({ type: "select", id: note.id });
              }}
            />
          );
        })}
    </div>
  );
};

export default styled(ListNote)`
  display: flex;
  flex-direction: column;

  border: ${(props) => props.theme.color.dark} solid
    ${(props) => props.theme.border};
`;
