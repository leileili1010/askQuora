import QuestionListItem from "../../Questions/QuestionListItem/QuestionListItem";
import './TopicsQuestionsList.css'

const TopicsQuestionsList = ({topics}) => {
    if(topics.length == 0) return null;

 return (
        <div>
            <div className="topics-questions-list">
                {topics.map(topic => (
                    <div key={topic.id} className="topics-qs">
                        <div className="topic-container">
                            <img src={topic.cover_img} alt="Topic image" />
                            <div className="topic-info">
                                <p>{topic.name}</p>
                                <p>{topic.description}</p>
                            </div>
                        </div>
                        
                        {topic.questions.map(question => (
                            <QuestionListItem question={question} key={question.id} />
                        ))}
                        <div className="more">
                            More <i className="fa-solid fa-arrow-down"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopicsQuestionsList;