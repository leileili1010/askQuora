// import React from "react";
import { useSelector } from "react-redux";

export default function UserAvatar() {
    const user = useSelector((state) => state.session.user);
    const profileImg = user.profile_img;

    return (
        <div className="useravatar">
            <img src={profileImg} alt=""/>
        </div>
    );
}