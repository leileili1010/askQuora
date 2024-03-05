import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import {Link} from "react-router-dom"

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
    <>
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
        <ul className={"profile-dropdown"} ref={ulRef}>
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li><Link to={`/user-profile/${user.id}/questions`}>Your Questons</Link></li>
              <li><Link to={`/user-profile/${user.id}/answers`}>Your Answers</Link></li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </> 
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
