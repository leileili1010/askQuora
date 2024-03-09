import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function SearchResultsModal({ isOpen, onClose, questions, searchInput, setIsTyping}) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        setIsTyping(false)
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setIsTyping(true)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
        <div className="modal-backdrop"></div>
        <div className="search-result-modal" ref={modalRef}>
            <div className='search-icon'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className='search-title'>Search: </span>
                <span>{searchInput}</span>
            </div>
            {questions.map(question => {
              if (question.title !== "No question found")
                  return <Link to={`/questions/${question.id}`} key={question.id}><p>{question.title}</p></Link>
              else return <p>No question found</p>
                }
            )}
        </div>
    </>
  );
}

export default SearchResultsModal;