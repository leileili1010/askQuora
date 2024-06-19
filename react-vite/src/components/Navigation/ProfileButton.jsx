import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import {Link} from "react-router-dom"
import "./ProfileButton.css"

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const hasProfileImg = user?.profile_img;

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div className="profile-button-container">
      {hasProfileImg ? (
        <img
          className="nav-profile-img"
          src={user?.profile_img}
          alt="Profile Image"
          onClick={toggleMenu}
        />
      ) : (
        <img
          className="profile-image"
          src="https://askcora.s3.us-west-1.amazonaws.com/profile_img/anonimous+profile.png"
          alt="Profile Image"
          onClick={toggleMenu}
        />
      )}

      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
              <li className="greeting">Hello, {user.first_name}!</li>
              <li><i className="fa-solid fa-envelope"></i> {user.email}</li>
              <li className="your-profile-click"><Link to={`/user-profile/${user.id}`}><i className="fa-regular fa-address-card"></i> Your Profile</Link></li>
              <li className="log-out-btn">
                <button className="log-out-btn" onClick={logout}><i className="fa-solid fa-right-from-bracket"></i> Log Out</button>
              </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
