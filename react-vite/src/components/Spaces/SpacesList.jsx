import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserSubscriptions } from "../../redux/session";
import { useEffect, useState } from "react";


const SpacesList = ({setSub}) => {
    const dispatch = useDispatch()
    const spaces = useSelector(state => state.session.userSubscriptions)


    useEffect(() => {
        dispatch(thunkGetUserSubscriptions())
    }, [dispatch])

    return (
        <div className="spaces-container">
            <div className="add-subs">
                <i className="fa-solid fa-plus"></i>
                <span className="add-sub">Subscriptions</span>
            </div>
            <div className="subscriptions">
                <div className="subscription" onClick={() => setSub({})}>
                    <img src="https://askcora.s3.us-west-1.amazonaws.com/topics_image/everything.png" />
                    <p>Everything</p>
                </div>
                {spaces?.map(space =>
                    <div className="subscription" onClick={() => setSub(space?.topic)}>
                        <img src={space?.topic.cover_img} alt="" />
                        <p>{space?.topic.name}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpacesList;