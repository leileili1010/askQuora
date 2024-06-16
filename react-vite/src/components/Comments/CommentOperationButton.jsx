import { useState, useEffect, useRef } from "react";
import { thunkDeleteComment, thunkGetComments } from "../../redux/comment";
import { useDispatch, } from "react-redux";
import "./CommentOperationButton.css"; 

const CommentOperationButton = ({comment, answer, setDeleteComment}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDeleteComment = async(e) => {
        e.preventDefault();
        const res = dispatch(thunkDeleteComment(comment.id))   
        if (res?.errors) {
            console.error('Failed to delete comment:', res.errors);
        } else {
            await dispatch(thunkGetComments(answer.id));
            setShowMenu(false);
            setDeleteComment(prev => prev + 1);
        }
    }

    return (
        <div className="menu-container">
            <div className="three-dots" onClick={toggleMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </div>
            {showMenu && (
                <ul className="menu-list" ref={ulRef}>
                    <li className="flex operation-button">
                        <i className="fa-solid fa-delete-left fa-flip-horizontal"></i>
                        <button onClick={handleDeleteComment}>Delete</button>
                    </li>
                    <li className="flex operation-button">
                        <i className="fa-regular fa-pen-to-square"></i>
                        <button>Edit</button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default CommentOperationButton;

