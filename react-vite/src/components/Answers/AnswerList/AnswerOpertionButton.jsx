import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteAnswerModal from '../AnswerOperations/DeleteAnswerModal';
import EditAnswerModal from "../AnswerOperations/EditAnswerModal";

const AnswerOperationButton = ({answer,setDeleteA, setEditA}) => {
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
        <div className="menu-container" >
            <div className="three-dots" onClick={toggleMenu} style={{ color: "#333" }}>
                <i className="fa-solid fa-ellipsis"></i>
            </div>
            {showMenu && (
                <ul className={ulClassName} ref={ulRef}>
                  <div className="flex opearion-button" style={{ color: "#333" }}>
                    <i className="fa-solid fa-delete-left fa-flip-horizontal"></i>
                    <OpenModalMenuItem
                      itemText="Edit"
                      onItemClick={closeMenu}
                      modalComponent={<EditAnswerModal answer={answer} setEditA={setEditA}/>}
                    />
                  </div>
                  
                  <div className="flex opearion-button" style={{ color: "#333" }}> 
                    <i className="fa-regular fa-pen-to-square" ></i>
                      <OpenModalMenuItem
                        itemText="Delete"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteAnswerModal answer={answer} setDeleteA={setDeleteA} />}
                      />
                  </div>
                </ul>
            )}
        </div>
    )
}

export default AnswerOperationButton;