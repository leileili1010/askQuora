import { Link } from "react-router-dom";
import AnswerOperationButton from "./AnswerOpertionButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useMemo } from "react";
import './AnswerListItem.css';

const AnswerListItem = ({ answer, setDeleteA, setEditA }) => {
    const user = useSelector(state => state.session.user);
    const isOwner = user?.id === answer?.author.id;
    const answerCountText = answer.question.numOfAnswers > 1 ? `1 of ${answer.question.numOfAnswers} answers` : "Currently 1 answer";
   
   
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncation = () => setIsTruncated(!isTruncated);

    const firstImageUrl = useMemo(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(answer.detail, 'text/html');
        const firstImage = doc.querySelector('img');
        return firstImage ? firstImage.src : null;
    }, [answer.detail]);

    return (
        <div className="answer">
            <div className="author-profile">
                <img className="profile-image" src={answer.author.profile_img} alt="Profile image" />
                <div className="author">
                    <p className="author-name">{answer.author.first_name} {answer.author.last_name}</p>
                    <p>{answer.author.position} · {answer.author.years_of_experience}yr, {answer.author.field}</p>
                </div>
            </div>

            <Link to={`/questions/${answer.question.id}`}>{answer.question.title}</Link>

            <div className={isTruncated ? "truncated-text rendered-content-class" : "rendered-content-class"} 
                 dangerouslySetInnerHTML={{ __html: answer.detail }} />

            {isTruncated && firstImageUrl &&
                <img className="rendered-content-class" src={firstImageUrl} alt="" />
            }

            <div className="flex answer-comment-area">
                <div className="user-comments-area">
                    <Link to={`/questions/${answer.question.id}`}>{answerCountText}</Link>
                </div>

                <div className="flex user-comments-area">
                    <div>
                        <i className="fa-regular fa-comment comment"></i>
                    </div>

                    {isOwner && (
                        <div className="operation-button">
                            <AnswerOperationButton answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} />
                        </div>
                    )}
                </div>
            </div>

            {isTruncated && (
                <span className="more-link" onClick={toggleTruncation}>
                    (more)
                </span>
            )}
        </div>
    );
};

export default AnswerListItem;
