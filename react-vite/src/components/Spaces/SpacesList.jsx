import { thunkGetTopics } from "../../redux/topic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SpacesList = ({setSub}) => {
    const dispatch = useDispatch();
    const topicsObj = useSelector(state => state.topics)
    const topics = Object.values(topicsObj);
   
    useEffect(() => {
        dispatch(thunkGetTopics())
    }, [dispatch])
   
    return (
        <div className="spaces-container">
            <div className="add-subs">
                <span className="add-sub">Your Topics</span>
            </div>
            <div className="subscriptions">
                <div className="subscription" onClick={() => setSub({})}>
                    <img src="https://askcora.s3.us-west-1.amazonaws.com/topics_image/everything-cover.jpg" />
                    <p>Everything</p>
                </div>
                {topics?.map(topic =>
                    <div key={topic?.id} className="subscription" onClick={() => {setSub(topic)}}>
                        <img src={topic?.cover_img} alt="" />
                        <p>{topic?.name}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpacesList;