import React, { useReducer, useContext, useCallback, useEffect } from "react";
import MainContext from "./MainContext";
import { cloneDeep } from "lodash";
import { decrypt, encrypt } from "../utils/encryption";

const INITIAL_STATE = {
  note: null,
  opening: false,
  editing: false,
  canceling: false,
  saving: false,
};

const EditorContext = React.createContext({});
export default EditorContext;

export const EditorContextProvider = ({ children }) => {
  const { data: mainData, dispatch: mainDispatch } = useContext(MainContext);

  const fire = useCallback((state, action) => {
    switch (action.type) {
      case "open":
        return { ...state, opening: true };
      case "opened":
        return { ...state, note: action.note, opening: false };
      case "clear":
        return INITIAL_STATE;
      case "edit":
        return { ...state, editing: true };
      case "cancel":
        return { ...state, editing: false, canceling: true };
      case "canceled":
        return { ...state, canceling: false };
      case "save":
        return { ...state, saving: true, editing: false };
      case "saved":
        return { ...state, editing: false, saving: false };
      case "delete":
        return { ...state, deleting: true };
      case "deleted":
        return { ...state, deleting: false };
      case "update_content":
        return { ...state, note: { ...state.note, content: action.content } };
      case "update_title":
        return { ...state, note: { ...state.note, title: action.title } };
      default:
        throw new Error(`EditorContext : Unknown ${action.type}`);
    }
  }, []);

  const [data, dispatch] = useReducer(fire, INITIAL_STATE);

  useEffect(() => {
    async function open() {
      let note = mainData.list.find(
        (note) => note.id === mainData.selectedNoteId
      );
      if (note) {
        dispatch({ type: "open" });
        note.content = await decrypt(note.content);
        dispatch({ type: "opened", note: cloneDeep(note) });
        if (mainData.creating) {
          dispatch({ type: "edit" });
          mainDispatch({ type: "created" });
        }
      } else {
        dispatch({ type: "clear" });
      }
      dispatch({ type: "canceled" });
    }
    open();
  }, [mainData.selectedNoteId, data.canceling]);

  useEffect(() => {
    async function save() {
      if (data.saving) {
        data.note.content = await encrypt(data.note.content);
        mainDispatch({ type: "save", note: cloneDeep(data.note) });
      }
      dispatch({ type: "saved" });
    }

    save();
  }, [data.saving]);

  useEffect(() => {
    if (data.deleting) {
      mainDispatch({ type: "delete", note: cloneDeep(data.note) });
      dispatch({ type: "clear" });
    }
    dispatch({ type: "deleted" });
  }, [data.deleting]);

  return (
    <EditorContext.Provider value={{ data, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};
