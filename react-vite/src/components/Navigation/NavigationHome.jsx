import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import CreateQuestionModal from "../Questions/CreateQuestion/CreateQuestion";
import "./Navigation.css";

function NavigationHome({answers, searchInput, setSearchInput, currentAnswers, setCurrentAnswers}) {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
      setSearchInput(e.target.value)

      if (!e.target.value.length) {
        setCurrentAnswers([...answers])
      } else {
        const newAnswers = answers.filter(answer => answer.detail.toLowerCase().includes(searchInput.toLowerCase()))
        setCurrentAnswers(newAnswers)
      }
  }

  return (
    <div className="nav-bar-container">
      <div className="navigation">
        <div className="nav-bar">
          <div className="logo">
            <NavLink to="/topics">askQuora</NavLink>
          </div>
          <i id="home-sign" onClick={() => navigate("/topics")} className="fa-solid fa-house" ></i>
          <i className="fa-regular fa-pen-to-square" style={{ color: "#626466" }}></i>
          <i className="fa-solid fa-users" style={{ color: "#626466" }}></i>
          <form action="/search" method="get">
            <input type="text" name="query" placeholder="Search answers..." value={searchInput} onChange={handleInputChange} />
            {/* <button type="submit">Search</button> */}
          </form>
        </div>

        <div className="profile-addQ">
          <ProfileButton />
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

export default NavigationHome;
