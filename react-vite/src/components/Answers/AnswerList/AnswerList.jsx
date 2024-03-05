import AnswerListItem from "./AnswerListItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

const AnswerList = ({answers}) => {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

    return (
        <div>
            {answers.map(answer => 
               <AnswerListItem answer={answer} key={answer.id} />    
            )}
        </div>
    )
}

export default AnswerList;