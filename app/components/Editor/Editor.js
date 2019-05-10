import React, { useEffect, useRef } from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';
import './Editor.css';

export default function Editor ({ className, onChange, jsonPayload = {} }) {
  let editor = null;
  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      editor = new JSONEditor(el.current, {
        mainMenuBar: false,
        mode: 'code',
        navigationBar: false,
        onChangeText: onChange,
        search: false,
        statusBar: false
      });

      editor.set(jsonPayload);
    }
  }, []);

  return (
    <div className={className} ref={el} />
  );
}
