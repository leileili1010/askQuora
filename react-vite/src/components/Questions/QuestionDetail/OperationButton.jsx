import { useState, useEffect, useRef } from "react";
import DeleteQuestionModal from './DeleteQuestionModal'
import EditQuestionModal from "./EditQuestionModal";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import "./OperationButton.css"

const OperationButton = ({question, setDeleteQ, setEditQ}) => {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); 
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
        <div className="menu-container">
            <div className="three-dots" onClick={toggleMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </div>
            {showMenu && (
                <ul className={ulClassName} ref={ulRef}>
                  <div className="flex opearion-button"> 
                      <i className="fa-solid fa-delete-left fa-flip-horizontal"></i>
                      <OpenModalMenuItem
                        itemText={"Delete"}
                        onItemClick={closeMenu}
                        modalComponent={<DeleteQuestionModal question={question} setDeleteQ={setDeleteQ}/>}
                      />
                  </div>
                 
                  <div className="flex opearion-button">
                      <i className="fa-regular fa-pen-to-square"></i>
                      <OpenModalMenuItem
                        itemText="Edit"
                        onItemClick={closeMenu}
                        modalComponent={<EditQuestionModal question={question} setEditQ={setEditQ} />}
                      />
                  </div>
                  
                </ul>
            )}
        </div>
    )
}

export default OperationButton;