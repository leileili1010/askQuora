import { useState, useEffect, useRef } from "react";
import DeleteQuestionModal from './DeleteQuestionModal'
import EditQuestionModal from "./EditQuestionModal";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

const OperationButton = ({question, setDeleteQ}) => {
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

      const ulClassName = "operations" + (showMenu ? "" : " hidden");

    return (
        <div>
            <div className="three-dots" onClick={toggleMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </div>
            {showMenu && (
                <ul className={ulClassName} ref={ulRef}>
                    <OpenModalMenuItem
                      itemText="Delete Question"
                      onItemClick={closeMenu}
                      modalComponent={<DeleteQuestionModal question={question} setDeleteQ={setDeleteQ}/>}
                    />
                    <OpenModalMenuItem
                      itemText="Edit Question"
                      onItemClick={closeMenu}
                      modalComponent={<EditQuestionModal question={question} />}
                    />
                </ul>
            )}
        </div>
    )
}

export default OperationButton;