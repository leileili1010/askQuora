import AnswerListItem from "./AnswerListItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

const AnswerList = ({answers, setDeleteA, setEditA}) => {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const answersReversed = [...answers].reverse();

    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

    return (
        <div className="answer-list-component">
            {answersReversed.map(answer =>
               <AnswerListItem answer={answer} setDeleteA={setDeleteA} seEditA={setEditA} key={answer.id} />    
            )}
        </div>
    )
}

export default AnswerList;