import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteAnswerModal from '../AnswerOperations/DeleteAnswerModal';
import EditAnswerModal from "../AnswerOperations/EditAnswerModal";

const AnswerOperationButton = ({answer}) => {
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
                      itemText="Edit Answer"
                      onItemClick={closeMenu}
                      modalComponent={<EditAnswerModal answer={answer} />}
                    />
                    <OpenModalMenuItem
                      itemText="Delete Answer"
                      onItemClick={closeMenu}
                      modalComponent={<DeleteAnswerModal answer={answer}  />}
                    />
                </ul>
            )}
        </div>
    )
}

export default AnswerOperationButton;