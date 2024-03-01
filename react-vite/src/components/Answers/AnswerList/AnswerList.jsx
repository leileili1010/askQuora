import AnswerListItem from "./AnswerListItem";

const AnswerList = ({answers}) => {
    return (
        <div>
            {answers.map(answer => 
               <AnswerListItem answer={answer} key={answer.id} />    
            )}
        </div>
    )
}

export default AnswerList;