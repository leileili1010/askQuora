import { useParams, Link } from "react-router-dom";
import {thunkGetQuestion, returnInitialQuestionState} from '../../../redux/question'
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import AnswerList from "../../Answers/AnswerList/AnswerList";
import Navigation from "../../Navigation/Navigation"
import { useNavigate} from "react-router-dom";
import QuestionListItem from "../QuestionListItem/QuestionListItem";
import { thunkSetUserAnswers } from "../../../redux/session";
import { thunkGetTopic, returnTopicInitial } from "../../../redux/topic"; 
import ChatbotComponent from "../../Chatbot/ChatbotComponent";
import "./QuestionDetail.css"


const QuestionDetail = () => {
    const {questionId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const question = useSelector(state => state.questions[questionId])
    const user = useSelector(state => state.session.user)
    const topicId = question?.topic?.id
    const topic = useSelector(state => state.topics[topicId])
    const questions = topic?.questions;
    const [deleteQ, setDeleteQ] = useState(0)
    const [editQ, setEditQ] = useState(0)
    const [editA, setEditA] = useState(0)
    const [deleteA, setDeleteA] = useState(0)
    const [openChatbot, setOpenChatbot] = useState(false);
    let relevantQs
    
    if (questions?.length > 1)
        relevantQs = questions.filter(question => question.id !== parseInt(questionId)).slice(0, 10); // Limit to 10 Qs
    
    
    
    useEffect(() => {
        if (!user) navigate("/");
    }, [user, navigate]);
    
    useEffect(() => {
        dispatch(thunkSetUserAnswers())
    }, [dispatch, editA, deleteA])
    
    useEffect(() => {
        dispatch(thunkGetQuestion(questionId))
        return () => {
            dispatch(returnInitialQuestionState());
        };
    }, [dispatch, questionId, deleteQ, editQ])

    useEffect(() => {
        if (topicId) {
            dispatch(thunkGetTopic(topicId));
        }
        return () => {
            dispatch(returnTopicInitial());
        };
    }, [dispatch, topicId, questionId, deleteQ, editQ]);

    
    if(!question) return null;

    return (
        <div className="question-details-page">  
            <Navigation openChatbot={openChatbot} setOpenChatbot={setOpenChatbot}/>
            <div className="question-detail">
                {/*part 1: question detail*/}
                <div  className="question-answers-container">
                    {/*question details*/}
                    <QuestionListItem question={question} setDeleteQ={setDeleteQ} setEditQ={setEditQ}/>
                    {/*answers list*/}
                    <div className="answers-container">
                        <AnswerList questionId={questionId} setDeleteA={setDeleteA} setEditA={setEditA}/>
                    </div>
                </div>
                
                  {/*part 2: relevant questions */}
                  {relevantQs && relevantQs.length > 0? (
                    <div className="relevant-Qs">
                        <p>Related questions</p>
                        <div className="relevantQs">
                            {relevantQs.map(relevantQ => (
                                <Link to={`/questions/${relevantQ.id}`} key={relevantQ.id}>{relevantQ.title}</Link>
                            ))}
                        </div>
                    </div>
                  ): (
                    <div className="relevant-Qs">
                        <p>Related questions</p>
                        <div className="relevantQs">
                            <p></p>
                        </div>
                    </div>
                  )
                  }
            </div>
            
                <div className="chat-icon" onClick={() => setOpenChatbot(!openChatbot)}>
                    <img src="https://askcora.s3.us-west-1.amazonaws.com/Answer_img/chat.png" alt="" />
                    {openChatbot && <div className="question-chatbot">
                    <ChatbotComponent />
                </div>}
               
                
            </div>
            


        </div>
    )
}

export default QuestionDetail;