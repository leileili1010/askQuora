import { useNavigate } from "react-router-dom";


const SpacesList = ({setSub,spaces, setTopicForUser}) => {
    const navigate = useNavigate()
   
    return (
        <div className="spaces-container">
            <div className="add-subs" onClick={() => navigate("/explore-topics")}>
                <i className="fa-solid fa-plus"></i>
                <span className="add-sub">Subscriptions</span>
            </div>
            <div className="subscriptions">
                <div className="subscription" onClick={() => setSub({})}>
                    <img src="https://askcora.s3.us-west-1.amazonaws.com/topics_image/everything-cover.jpg" />
                    <p>Everything</p>
                </div>
                {spaces?.map(space =>
                    <div key={space?.id} className="subscription" onClick={() => {setSub(space?.topic); setTopicForUser("")}}>
                        <img src={space?.topic.cover_img} alt="" />
                        <p>{space?.topic.name}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpacesList;