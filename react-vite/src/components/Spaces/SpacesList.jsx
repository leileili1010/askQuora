import { thunkGetTopics} from "../../redux/topic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNavigateToTopic } from "./HelperFunctions";
import Spinner from "../Answers/Spinner/Spinner";

const SpacesList = ({setSub}) => {
    const dispatch = useDispatch();
    const topicsObj = useSelector(state => state.topics)
    const navigate = useNavigate();
    const navigateToTopic = useNavigateToTopic();
    const topics = Object.values(topicsObj);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(thunkGetTopics());
            } catch (error) {
                console.error("Failed to fetch topics", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [dispatch]);
   
    return (
        <div className="spaces-container">
            <div className="add-subs">
                <span className="add-sub">Featured Spaces</span>
            </div>
            
            {loading && <Spinner />}

            {!loading && <div className="subscriptions">
                <div className="subscription" onClick={() => {navigate("/topics");setSub({})}}>
                    <img src="https://askcora.s3.us-west-1.amazonaws.com/topics_image/everything-cover.jpg" />
                    <p>Everything</p>
                </div>
                {topics?.map(topic =>
                    <div key={topic?.id} className="subscription" onClick={() => {navigateToTopic(topic.name);setSub(topic)}}>
                        <img src={topic?.cover_img} alt="" />
                        <p>{topic?.name}</p>
                    </div>
                )}
            </div>}
        </div>
    )
}

export default SpacesList;