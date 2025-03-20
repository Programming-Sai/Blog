"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css"; 
import styles from "../editorone/editorone.module.css";
import DOMPurify from "dompurify";

const EditorThree = ({ blogContent, setBlogContent, quillTheme }) => {
  const quillRef = useRef(null);
  const selectionRef = useRef(null);
  const [editorState, setEditorState] = useState(blogContent); // ✅ Local state to prevent re-renders

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["link", "image", "clean", "code-block", "blockquote", "video"],
    ],
    clipboard: { matchVisual: false },
    history: { delay: 2000, maxStack: 500, userOnly: true },
  };

  const formats = [
    "header", "font", "size", "bold", "italic", "underline", "strike",
    "color", "background", "list", "bullet", "indent", "align",
    "link", "image", "blockquote", "code-block", "video",
  ];

  const handleChange = (content, delta, source) => {
    if (source === "user") {
      const quill = quillRef.current?.getEditor();
      if (quill) {
        selectionRef.current = quill.getSelection(); // ✅ Store cursor position
      }

      const cleanContent = DOMPurify.sanitize(content, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src", "width", "height", "title", "style"],
      });

      setEditorState(cleanContent); // ✅ Update local state
      setBlogContent(cleanContent); // ✅ Update main state
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      if (quill && selectionRef.current) {
        setTimeout(() => {
          quill.setSelection(selectionRef.current); // ✅ Restore cursor
        }, 0);
      }
    }
  }, [editorState]); // ✅ Track only editorState, not blogContent

  return (
    <div className={styles.blogContent}>
      <ReactQuill
        ref={quillRef}
        value={editorState} // ✅ Use local state to prevent flickering
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme={quillTheme}
        placeholder="Start writing..."
      />
    </div>
  );
};


export default EditorThree;