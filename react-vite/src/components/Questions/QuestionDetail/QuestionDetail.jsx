import { useParams, Link } from "react-router-dom";
import {thunkGetQuestion, returnInitialQuestionState} from '../../../redux/question'
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetQuestionAnswers, returnInitial } from "../../../redux/answer";
import AnswerList from "../../Answers/AnswerList/AnswerList";
import Navigation from "../../Navigation/Navigation"
import { useNavigate} from "react-router-dom";
import QuestionListItem from "../QuestionListItem/QuestionListItem";
// import { thunkGetTopic, returnTopicInitial } from "../../../redux/topic"; 
import "./QuestionDetail.css"


const QuestionDetail = () => {
    const {questionId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const question = useSelector(state => state.questions[questionId])
    const user = useSelector(state => state.session.user)
    const answersObj = useSelector(state => state.answers)
    const topicId = question?.topic?.id
    const topic = useSelector(state => state.topics[topicId])
    const questions = topic?.questions;
    const [deleteQ, setDeleteQ] = useState(0)
    const [editQ, setEditQ] = useState(0)
    const [deleteA, setDeleteA] = useState(0)
    const [editA, setEditA] = useState(0)
    let relevantQs

    if (questions?.length > 1)
        relevantQs = questions.filter(question => question.id !== parseInt(questionId)).slice(0, 10); // Limit to 10 Qs
    
    // useEffect(() => {
    //     if (topicId) {
    //         dispatch(thunkGetTopic(topicId));
    //     }
    //     return () => {
    //         dispatch(returnTopicInitial());
    //       };
    // }, [dispatch, topicId]);
    
    
    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);
    
    useEffect(() => {
        dispatch(thunkGetQuestion(questionId))
        return () => {
            dispatch(returnInitialQuestionState());
          };
    }, [dispatch, questionId, deleteQ, editQ, editA, deleteA])

    useEffect(() => {
        dispatch(thunkGetQuestionAnswers(questionId))
        return () => {
            dispatch(returnInitial());
          };
    }, [dispatch, questionId, editA, deleteA])

    if (answersObj.length == 0) return null
    
    const answers = Object.values(answersObj)
    
    if(!question) return null;

    return (
        <div className="question-details-page">  
            <Navigation />
            <div className="question-detail">
                {/*part 1: question detail*/}
                <div  className="question-answers-container">
                    {/*question details*/}
                    <QuestionListItem question={question} setDeleteQ={setDeleteQ} setEditQ={setEditQ}/>
                    {/*answers list*/}
                    <div className="answers-container">
                        <AnswerList answers = {answers} setDeleteA={setDeleteA} setEditA={setEditA}/>
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
            


        </div>
    )
}

export default QuestionDetail;