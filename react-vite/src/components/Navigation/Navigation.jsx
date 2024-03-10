import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import CreateQuestionModal from "../Questions/CreateQuestion/CreateQuestion";
import { thunkSearchQuestions } from "../../redux/search";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResultsModal from "./SearchResults";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = useSelector(state => state.search.questions)
  const [searchInput, setSearchInput] = useState("");
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const noResultQ = {
    title: "No question found"
  }
  
  useEffect(() => {
    dispatch(thunkSearchQuestions())
  }, [dispatch])
  
  const handleSearch = (e) => {
    setSearchInput(e.target.value)
    if(!e.target.value.length) {
      setCurrentQuestions([])
      setModalOpen(false)
    } else {
      const newQuestions= questions.filter(question => question.title.toLowerCase().includes(searchInput.toLocaleLowerCase()))
      if (!newQuestions.length) setCurrentQuestions([noResultQ])
      else setCurrentQuestions(newQuestions.slice(0,8))
      setModalOpen(true)
    } 
  }

useEffect(() => {
  if (searchInput) setModalOpen(true);
  else setModalOpen(false);
}, [searchInput]);


const handleCloseModal = () => {
  setModalOpen(false);
  setSearchInput(""); 
};

  return (
    <div className="nav-bar-container">
      
      <div className="navigation">
        <div className="nav-bar">
          <div className="logo">
            <NavLink to="/topics">askQuora</NavLink>
          </div>
          <i id="home-sign" onClick={() => navigate("/topics")} className="fa-solid fa-house" ></i>
          <i className="fa-regular fa-pen-to-square" style={{ color: "#626466" }}></i>
          <i id="group-sign" className="fa-solid fa-users" onClick={() => navigate("/explore-topics")}></i>
          <div className="search-container">
            <form style={{ width: isTyping? '500px' : '360px' }}action="/search" method="get">
              <input type="text" name="query" placeholder="Search questions..." value={searchInput} onChange={handleSearch} />
            </form>
              <SearchResultsModal isOpen={modalOpen} onClose={handleCloseModal} questions={currentQuestions} searchInput={searchInput} setIsTyping={setIsTyping}/>
          </div>
          
        </div>
        
        <div className="profile-addQ">
          {!isTyping && <ProfileButton />}
          
          <div className="pledge-detail">
            <OpenModalButton
              buttonText="Add question"
              modalComponent={<CreateQuestionModal />}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Navigation;
