import { useDispatch, useSelector } from "react-redux";
import { thunkGetTopics } from "../../redux/topic";
import Navigation from "../Navigation/Navigation";
import "./ExploreTopics.css"
import { useEffect } from "react";


const ExploreTopics = () => {
    const dispatch = useDispatch();
    const topicObj = useSelector(state => state.topics)
    const topics = Object.values(topicObj)

    useEffect(() => {
        dispatch(thunkGetTopics())
    }, [dispatch])

   

    return (
        <div id="explore-topics-page">
            <Navigation/>

            <div className="explore-topics-container">
                <div className="explore-topics">
                    <h2>Discover Topics</h2>
                    <div className="all-topics">
                        {
                            topics.map(topic => 
                                <>
                                    <div className="single-topic">
                                        <img src={topic.cover_img}/>
                                    </div>
                                
                                </>
                                
                            )
                        }
                    </div>
                </div>

                <div className="your-topics">

                </div>

            </div>

        </div>
    )
}

export default ExploreTopics;