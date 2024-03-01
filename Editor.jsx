import React, { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill';

const Editor = ({ value, onValueChange }) => {
    const quillRef = useRef(null);
    
    // Simulate image upload process
    const uploadImage = async (file) => {
        // You would typically upload the image to your server or an external storage service here
        // This is a placeholder for the upload logic
        // For demonstration, return a URL from a placeholder service
        return 'https://via.placeholder.com/150';
    };
     
    // Function to handle image upload
     const imageHandler = () => {
        if (!quillRef.current) return;
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            // Call function to upload image, get URL
            const imageUrl = await uploadImage(file);
            // Insert image URL into editor
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', imageUrl);
        };
    };

    // function imageHandler() {
    //   if (!quillRef.current) return;
  
    //   const editor = quillRef.current.getEditor();
    //   const range = editor.getSelection();
    //   const value = prompt("Please enter the image URL");
  
    //   if (value && range) {
    //     editor.insertEmbed(range.index, "image", value, "user");
    //   }
    // }

    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ header: [2, 3, 4, 5, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "code-block"],
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
        ref={quillRef}
        theme="snow"
        onChange={onValueChange}
        modules={modules}
        value={value}
        placeholder="Details about your question..."
      />
    );
  };

export default Editor;




  