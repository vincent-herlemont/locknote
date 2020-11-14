import React, { useReducer } from "react";
import shortid from "shortid";

const INITIAL_STATE = {
  selectedNoteId: null,
  creating: false,
  list: [],
};

const MainContext = React.createContext({});
export default MainContext;

function fire(state, action) {
  switch (action.type) {
    case "select":
      if (!action.id) {
        return state;
      }
      if (state.selectedNoteId === action.id) {
        return { ...state, selectedNoteId: null };
      }
      return { ...state, selectedNoteId: action.id };
    case "create":
      if (state.creating) {
        return state;
      }
      const id = shortid.generate();
      const note = {
        id: id,
        title: `Untitled note`,
        content: "Content ...",
        createdAt: new Date().getTime(),
      };
      if (state.list.find((obj) => obj.id === id)) {
        return state;
      } else {
        return {
          ...state,
          selectedNoteId: id,
          creating: true,
          list: [...state.list, note],
        };
      }
    case "created":
      return { ...state, creating: false };
    case "save":
      if (!action.note?.id) {
        return state;
      }
      return {
        ...state,
        list: state.list.map((note) => {
          if (note.id === action.note.id) {
            return { ...action.note };
          }
          return note;
        }),
      };
    case "delete":
      if (!action.note?.id) {
        return state;
      }
      return {
        ...state,
        list: state.list.filter((note) => note.id !== action.note.id),
      };
    default:
      throw new Error(`MainContext : Unknown ${action.type}`);
  }
}

export const MainContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(fire, INITIAL_STATE);

  return (
    <MainContext.Provider value={{ data, dispatch }}>
      {children}
    </MainContext.Provider>
  );
};
