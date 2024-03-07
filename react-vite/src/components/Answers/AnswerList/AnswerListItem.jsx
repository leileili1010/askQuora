import { Link } from "react-router-dom";
import AnswerOperationButton from "./AnswerOpertionButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {useState} from "react"
import './AnswerListItem.css'


 const AnswerListItem = ({answer, setDeleteA, setEditA}) => {
    const user = useSelector(state => state.session.user)
    const isOwner = user?.id == answer?.author.id
    const answer_s = answer.question.numOfAnswers > 1? `1 of ${answer.question.numOfAnswers} answers`: "Currently 1 answer"

    // set truncated answer.details
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
    };
    
    // get url of the 1st image if there is any
    const getFirstImageUrl = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const firstImage = doc.querySelector('img');
        return firstImage ? firstImage.src : null;
    };

    const firstImageUrl = getFirstImageUrl(answer.detail);

    // remove all images from answer.detail 
    const truncateDetail = (htmlContent) => {
        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        const images = doc.querySelectorAll('img');
        images.forEach(img => img.remove()); 
        return doc.body.innerHTML;
    };
    const truncatedDetail = truncateDetail(answer.detail);
    const contentToShow = isTruncated ? truncatedDetail : answer.detail;

    // lines
    // const contentRef = useRef(null);
//     const [applyClamp, setApplyClamp] = useState(false);

//    useEffect(() => {
//         if (contentRef.current) {
//             const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight, 10);
//             const contentHeight = contentRef.current.scrollHeight;
//             const isContentLongerThanThreeLines = contentHeight > lineHeight * 3;
//             setApplyClamp(isContentLongerThanThreeLines);
//         }
//     }, [answer.detail]);

//     const contentStyle = applyClamp && isTruncated ? {
//         display: '-webkit-box',
//         WebkitLineClamp: 3,
//         WebkitBoxOrient: 'vertical',
//         overflow: 'hidden',
//     } : {};
    
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

            <div 
                // ref={contentRef}
                // style={contentStyle}
                className={isTruncated ? "truncated-text rendered-content-class" : "rendered-content-class"} 
                dangerouslySetInnerHTML={{ __html: contentToShow }} 
            />

            {isTruncated && (
                <span className="more-link" onClick={toggleTruncation}>
                    (more)
                </span>
            )}

            {isTruncated && firstImageUrl &&
                <img className="rendered-content-class" src={firstImageUrl} alt="" />
            }

            <div>
                <i className="fa-regular fa-comment comment"></i>
            </div>
            <div>
                <Link to={`/questions/${answer.question.id}`}>{answer_s}</Link>
            </div>
            {isOwner && (
                <div className="operation-button">
                    <AnswerOperationButton answer={answer} setDeleteA={setDeleteA} seEditA={setEditA} />
                </div>
            )}
        </div>
    )
}

export default AnswerListItem;


