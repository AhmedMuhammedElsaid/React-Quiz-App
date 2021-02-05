import React from 'react'
import { AnswerObject } from '../App'
import { ButtonWrapper, Wrapper } from './QuestionCard.styles'

type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNum: number,
    totalQuestion: number
}
const QuestionCard: React.FC<Props> = ({ question, answers, callback, questionNum, totalQuestion, userAnswer, children }) => {
    return (
        <Wrapper>   
            <p className="number">
                Question: {questionNum} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={{__html:question}}/>
            <div>
                {answers?.map(answer=>(
                    <ButtonWrapper
                    correct={userAnswer?.correctAnswer===answer}
                    userClicked={userAnswer?.answer===answer}
                    key={answer}>
                        <button value={answer} disabled={userAnswer?true:false} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html:answer}}/>
                        </button>
                    </ButtonWrapper>
                ))} 
            </div>
        </Wrapper>
    )
}

export default QuestionCard