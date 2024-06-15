import { Link } from "react-router-dom";
import AnswerOperationButton from "./AnswerOpertionButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState} from "react";
import CommentList from "../../Comments/CommentsList";
import './AnswerListItem.css';
// import ReactHtmlParser from 'react-html-parser';
// import parse from "html-react-parser";

const AnswerListItem = ({ answer, setDeleteA, setEditA }) => {
    const user = useSelector(state => state.session.user);
    const isOwner = user?.id === answer?.author.id;
    const answerSummary = answer.question.numOfAnswers > 1
                         ? `1 of ${answer.question.numOfAnswers} answers`
                         : "Currently 1 answer";
    const [isTruncated, setIsTruncated] = useState(true);
    const [openComments, setOpenComments] = useState(false);
    const [like, setLike] = useState(false);
    const toggleTruncation = () => setIsTruncated(!isTruncated);

    // const htmlContent = ReactHtmlParser(answer.detail);
    // const htmlCoverContent = ReactHtmlParser(answer.detail_text);
    // const htmlDetail = isTruncated? htmlCoverContent: htmlContent

    // const htmlContent = parse(answer.detail);
    // const htmlCoverContent = parse(answer.detail_text);
    // const htmlDetail = isTruncated? htmlCoverContent: htmlContent

    return (
        <div className="answer">
            
            <div className="author-profile">
                <img className="profile-image loading" src={answer.author.profile_img} alt="Profile image" />
                <div className="author">
                    <p className="author-name">{answer.author.first_name} {answer.author.last_name}</p>
                    <p>{answer.author.position} · {answer.author.years_of_experience}yr, {answer.author.field}</p>
                </div>
            </div>

            <Link to={`/questions/${answer.question.id}`}>{answer.question.title}</Link>
 
            <div className={isTruncated ? "truncated-text rendered-content-class" : "rendered-content-class"}
                dangerouslySetInnerHTML={{ __html: isTruncated ? answer?.detail_text : answer.detail }} /> 
                
            {/* <div className={isTruncated ? "truncated-text rendered-content-class" : "rendered-content-class"}>  
                {htmlDetail}
            </div> */}

            {isTruncated && (
                <span className="more-link" onClick={toggleTruncation}>
                    (more)
                </span>
            )}

            {isTruncated && answer.detail_firstImgUrl && (
                <img className="rendered-content-class" src={answer.detail_firstImgUrl} loading="lazy" />
            )}

            <div className="comments-container">
                <div className="answer-comment-area">
                    <div className="user-comments-icon">
                        <div>
                           {!like && <i className="fa-regular fa-heart like" onClick={() => setLike(true)}></i>}
                           { like && <i className="fa-solid fa-heart like" onClick={() => setLike(false)}></i>}
                        </div>
                        
                        <div className="comment-icon" onClick = {() => setOpenComments(!openComments)}>
                            <i className="fa-regular fa-comment comment"></i>
                            <span>{answer.no_of_comments}</span>
                        </div>

                        <div className="user-comments-area">
                            <Link to={`/questions/${answer.question.id}`}>{answerSummary}</Link>
                        </div>
                    </div>
                    {isOwner && (
                        <div className="operation-button">
                            <AnswerOperationButton answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} />
                        </div>
                    )}
                </div>
                <div className="comments">
                    {openComments && <CommentList answer={answer}/>}
                </div>
            </div>
            
        </div>
    );
};

export default AnswerListItem;



