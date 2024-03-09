import AnswerListItem from "./AnswerListItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

const AnswerList = ({answers, setDeleteA, setEditA}) => {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

    return (
        <div className="answer-list-component">
            {answers.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).map(answer =>
               <AnswerListItem answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} key={answer.id} />    
            )}
        </div>
    )
}

export default AnswerList;