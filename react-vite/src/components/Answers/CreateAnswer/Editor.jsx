import React, { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill';

const Editor = ({ value, onValueChange }) => {
    const quillRef = useRef(null);
    
    const uploadImage = async (file) => {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
          const response = await fetch('/api/images/upload-image', {
              method: 'POST',
              body: formData
          });
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Error in uploading image: ${errorData.errors}`);
          }
          const data = await response.json();
          return data.url;
      } catch (error) {
          console.error('Error:', error.message);
      }
  };
     
     const imageHandler = () => {
        if (!quillRef.current) return;
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            const imageUrl = await uploadImage(file);
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', imageUrl);
        };
    };

    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ header: [2, 3, 4, false] }],
            [{ color: [] }],
            ["bold", "underline", "blockquote", "code-block"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
          handlers: {
            image: imageHandler,
          },
        },
      }),
      []
    );

  
    return (
      <ReactQuill
        className="editor"
        ref={quillRef}
        theme="snow"
        onChange={onValueChange}
        modules={modules}
        value={value}
        placeholder="Write your answer..."
      />
    );
  };

export default Editor;




  