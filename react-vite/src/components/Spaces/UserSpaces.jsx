import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserSubscriptions } from "../../redux/session";
import { useEffect, useState} from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UnsubscripModal from "./UnsubscripModal";
import "./UserSpaces.css"


const UserSpacesList = () => {
    const dispatch = useDispatch()
    const [deleteS, setDeleteS] = useState(0)
    const spaces = useSelector(state => state.session.userSubscriptions)

    useEffect(() => {
        dispatch(thunkGetUserSubscriptions())
    }, [dispatch, deleteS])

    return (
        <div id="spaces-container">
            {!spaces?.length &&  <p className="credentials-details">Currently no supscriptions</p>}
            <div className="subscriptions">
                {spaces?.map(space =>
                    <>
                        <div className="subscription" id="subscription">
                            <img src={space?.topic.cover_img} alt="" />
                            <p>{space?.topic.name}</p>
                            <div className="subscription-details">
                                <img src={space?.topic.cover_img} alt="" />
                                <div id="inner-sub-detail">
                                    <img  src={space?.topic.cover_img} alt="" />
                                    <p>{space?.topic.name}</p>
                                </div>
                                <div className="sub-btns">
                                    <OpenModalButton
                                    buttonText="Unsubscrib"
                                    modalComponent={<UnsubscripModal space={space} setDeleteS={setDeleteS}/>}
                                    className="sub-btn"
                                    />
                                    <button className="sub-btn">Explore subscriptions</button>
                                </div>
                            </div>
                        </div>
                    </>

                )}
            </div>
        </div>
    )
}

export default UserSpacesList;