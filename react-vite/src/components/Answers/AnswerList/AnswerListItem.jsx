import { Link } from "react-router-dom";
import AnswerOperationButton from "./AnswerOpertionButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState} from "react";
import './AnswerListItem.css';

const AnswerListItem = ({ answer, setDeleteA, setEditA }) => {
    const user = useSelector(state => state.session.user);
    const isOwner = user?.id === answer?.author.id;
    const answerSummary = answer.question.numOfAnswers > 1
                         ? `1 of ${answer.question.numOfAnswers} answers`
                         : "Currently 1 answer";
    const [isTruncated, setIsTruncated] = useState(true);

    // const { truncatedDetail, firstImageUrl } = useMemo(() => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(answer.detail, 'text/html');
    //     const images = doc.querySelectorAll('img');
    //     let firstImageUrl = null;

    //     if (images.length > 0) {
    //         firstImageUrl = images[0].src; 
    //         images[0].remove();
    //     }
        
    //     const textContent = doc.body.textContent

    //     return { 
    //         truncatedDetail: textContent,
    //         firstImageUrl,
    //     };
    // }, [answer.detail]);


    const toggleTruncation = () => setIsTruncated(!isTruncated);

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
                dangerouslySetInnerHTML={{ __html: isTruncated ? answer?.detail_text : answer.detail }} />

            {isTruncated && (
                <span className="more-link" onClick={toggleTruncation}>
                    (more)
                </span>
            )}

            {isTruncated && answer?.detail_firstImgUrl && (
                <img className="rendered-content-class" src={answer?.detail_firstImgUrl} loading="lazy" />
            )}

            <div className="answer-comment-area">
                <div className="user-comments-icon">
                    <div className="user-comments-area">
                        <Link to={`/questions/${answer.question.id}`}>{answerSummary}</Link>
                    </div>
                    <div>
                        <i className="fa-regular fa-comment comment"></i>
                    </div>
                </div>
                
                {isOwner && (
                    <div className="operation-button">
                        <AnswerOperationButton answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} />
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default AnswerListItem;



