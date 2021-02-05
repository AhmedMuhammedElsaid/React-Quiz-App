import React, { useEffect, useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './APIS';
import { GlobalStyle, Wrapper } from './App.styles';
import QuestionCard from './Components/QuestionCard';
const TOTAL_QUESTIONS = 10
export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}
const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])

  useEffect(() => {
    startTrivia()
  }, [])
  const startTrivia = async () => {
    // fetching the questions from the api
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setLoading(false)
    setNumber(0)
  }
  const checkAnswers = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // comparing the selected answer by the right one ,
    if (!gameOver) {

      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1)
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObj])
    }
  }
  const nextQuestion = () => {
    //Move on to the next Question 
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <h1>React Quiz</h1>

        {!gameOver ?
          <p className="score">
            Your  Score : {score}
          </p>
          : null}
        {loading && <p>Loading Questions ....</p>}
        {
          !loading && !gameOver && (
            <QuestionCard
              questionNum={number + 1}
              totalQuestion={TOTAL_QUESTIONS}
              question={questions[number]?.question}
              answers={questions[number]?.answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswers}
            />
          )
        }
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button onClick={nextQuestion} className="next">
            Next Question
          </button>
        )
          : null}
        {userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start Again
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
