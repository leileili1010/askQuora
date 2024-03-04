import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import CreateQuestionModal from "../Questions/CreateQuestion/CreateQuestion";

function Navigation() {
  const navigate = useNavigate();
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
            <input type="text" name="query" placeholder="Search questions..." />
            <button type="submit">Search</button>
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

export default Navigation;
