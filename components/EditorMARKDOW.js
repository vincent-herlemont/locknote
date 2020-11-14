import React, { useContext, Fragment } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import EditorContext from "../contexts/EditorContext";

const EditorMARKDOW = () => {
  const {
    data: {
      note: { content },
      editing,
    },
    dispatch,
  } = useContext(EditorContext);

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // Finish!
  function handleEditorChange({ html, text }) {
    dispatch({ type: "update_content", content: text });
  }

  return (
    <Fragment>
      {editing ? (
        <MdEditor
          value={content}
          style={{ height: "100%", width: "100%" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      ) : (
        <div style={{ paddingLeft: "1em", zIndex: 9999 }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </Fragment>
  );
};

export default EditorMARKDOW;
