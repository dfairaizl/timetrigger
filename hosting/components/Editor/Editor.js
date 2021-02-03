import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import "./Editor.css";

function Editor({ className, onChange, jsonPayload = {} }) {
  let editor = null;
  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      editor = new JSONEditor(el.current, {
        mainMenuBar: false,
        mode: "code",
        navigationBar: false,
        onChangeText: onChange,
        search: false,
        statusBar: false,
      });

      editor.set(jsonPayload);

      editor.aceEditor.setOption("showGutter", false);
    }
  }, []);

  return <div className={className} ref={el} />;
}

Editor.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  jsonPayload: PropTypes.object,
};

export default Editor;
