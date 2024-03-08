import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function SearchResultsModal({ isOpen, onClose, questions, searchInput }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
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
            {questions.map(question => (
            <Link to={`/questions/${question.id}`} key={question.id}><p>{question.title}</p></Link>
            ))}
        </div>
    </>
  );
}

export default SearchResultsModal;