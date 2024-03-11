import { useDispatch, useSelector } from "react-redux";
import { thunkGetTopics } from "../../redux/topic";
import Navigation from "../Navigation/Navigation";
import { useRef } from "react";
import "./ExploreTopics.css"
import { useEffect } from "react";


const ExploreTopics = () => {
    const dispatch = useDispatch();
    const topicObj = useSelector(state => state.topics)
    const topics = Object.values(topicObj)
    const scrollToRef = useRef(null);

    useEffect(() => {
        dispatch(thunkGetTopics())
    }, [dispatch])

   const handleClick = () => {
        window.alert("Feature coming soon...")
        
   }

   const handleScroll = () => {
    if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}

    return (
        <div id="explore-topics-page">
            <Navigation/>

            <div className="explore-topics-container">
                <div className="explore-topics">
                    <div className="owned-topics">
                        <div className="your-topic-title">
                            <h3>Your Topics</h3>
                            <div className="your-topic-btns">
                                <button onClick={handleClick}><i className="fa-solid fa-circle-plus"></i> Create a Topic</button>
                                <button onClick={handleScroll}><i className="fa-regular fa-compass"></i> Discover Topics</button>
                            </div>
                        </div>

                        <div className="ur-topic-list">
                            <p>You have not created any topics...</p>
                        </div>
                    </div>
                    
                    <div className="all-topics-container" >
                        <h3 ref={scrollToRef}>Discover Topics</h3>
                        <div className="all-topics">
                            {
                                topics.map(topic =>
                                    <div key={topic.id} className="one-topic">
                                        <img src={topic.cover_img} className="topic-cover-img" />
                                        <div className="one-topic-detail">
                                            <img src={topic.cover_img} alt="" />
                                            <p className="one-topic-name">{topic.name}</p>
                                            <p>{topic.description}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                  
                </div>

                <div className="your-topics">

                </div>

            </div>

        </div>
    )
}

export default ExploreTopics;