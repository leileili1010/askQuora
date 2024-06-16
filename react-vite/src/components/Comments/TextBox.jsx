import { useState, useRef, useEffect } from "react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const TextBox = ({text, setText}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef(null);


    const handleEmojiSelect = emoji => {
        setText(prevText => prevText + emoji.native);
      };


    useEffect(() => {
        const handleClickOutside = event => {
          if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            setShowEmojiPicker(false);
          }
        };
    
        if (showEmojiPicker) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [showEmojiPicker]);

    return (
        <>
            <div className="text-box">
                <textarea
                    placeholder="Add a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <i className="fa-solid fa-face-laugh emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}></i>
            </div>

            {showEmojiPicker && <div className="emoji-container" ref={emojiPickerRef}>
                <Picker theme="dark" emojiSize={20} emojiButtonSize={28} data={data} onEmojiSelect={handleEmojiSelect} />
            </div>}
        </>
       
    );
}

export default TextBox;