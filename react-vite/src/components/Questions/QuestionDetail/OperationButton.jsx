import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteQuestionModal from './DeleteQuestionModal'
import EditQuestionModal from "./EditQuestionModal";

const OperationButton = ({question}) => {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
      };

    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);
    
      const closeMenu = () => setShowMenu(false);  

    return (
        <div>
            <div onClick={toggleMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </div>
            {showMenu && (
                <ul ref={ulRef}>
                    <OpenModalButton
                      buttonText="Delete Question"
                      modalComponent={<DeleteQuestionModal question={question} />}
                    />
                    <OpenModalButton
                      buttonText="Edit Question"
                      modalComponent={<EditQuestionModal question={question} />}
                    />
                </ul>
            )}
        </div>
    )
}

export default OperationButton;