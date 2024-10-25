import React, { useContext, useState, useEffect } from 'react';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  
import 'react-quill/dist/quill.bubble.css';  
import styles from './editorone.module.css';



const EditorOne = ({ blogContent, setBlogContent, quillTheme }) => {



  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'clean', 'code-block', 'blockquote', 'video' ], 
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 
    'color', 'background', 'list', 'bullet', 'indent', 'align', 
    'link', 'image', 'blockquote', 'code-block', 'video',
  ];


  useEffect(() => {
    const adjustBubblePosition = () => {
      const tooltip = document.querySelector('.ql-bubble .ql-tooltip');
      if (!tooltip) return;
  
      const rect = tooltip.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
  
      // Adjust horizontal overflow
      if (rect.right > screenWidth) {
        tooltip.style.left = `${screenWidth - rect.width - 10}px`;  // Adjust for overflow on the right
      }
      if (rect.left < 0) {
        // tooltip.style.right = `20px`;  
        tooltip.style.right = `${screenWidth - rect.width - 10}px`;  // Adjust for overflow on the right
      }
  
      // Adjust vertical overflow
      if (rect.bottom > screenHeight) {
        tooltip.style.top = `${screenHeight - rect.height - 10}px`;  // Adjust for overflow on the bottom
      }
      if (rect.top < 0) {
        tooltip.style.top = `10px`;  // Adjust for overflow on the top
      }
    };
  
    // Adjust when the tooltip appears
    document.addEventListener('mousemove', adjustBubblePosition);
  
    return () => {
      document.removeEventListener('mousemove', adjustBubblePosition);
    };
  }, []);
  

  return (
    <div className={styles.blogContent} key={quillTheme}>
            <ReactQuill 
                value={blogContent} 
                onChange={setBlogContent} 
                modules={modules}
                formats={formats}
                theme={quillTheme}
                placeholder="Blog Content..."
            />
        </div>
  )
}

export default EditorOne
