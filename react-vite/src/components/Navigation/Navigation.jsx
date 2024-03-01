import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import CreateQuestionModal from "../Questions/CreateQuestion/CreateQuestion";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
      <div className="pledge-detail">
          <OpenModalButton
            buttonText="Add question"
            modalComponent={<CreateQuestionModal/>}
          />
        </div>
    </ul>
  );
}

export default Navigation;
