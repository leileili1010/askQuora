import AnswerListItem from "./AnswerListItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect} from "react";
import { useNavigate} from "react-router-dom";

const AnswerListHome = ({answers, setDeleteA, setEditA}) => {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const sortedAnswers = [...answers].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1500); 
    // }, []);

    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

    //   if (isLoading) return(
    //     <div className="answer-list-component">
    //         <div className="spinner">Loading...</div>
    //     </div>
    //   )

    if (!answers.length) return null;

    return (
        <div className="answer-list-component">
            {sortedAnswers.map(answer =>
               <AnswerListItem answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} key={answer.id} />    
            )}
        </div>
    )
}

export default AnswerListHome;