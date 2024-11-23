import { useState, useEffect } from 'react'
import StartGame from "./components/StartGame"
import SingleQuiz from "./components/SingleQuiz"
import './styles/style.scss'
import { nanoid } from 'nanoid'
import he from "he"

export default function App() {
const [quizActive, setQuizActive] = useState(false)
const [showScore, setShowScore] = useState()
const [quizzes, setQuizzes] = useState([])
const [selectedAnswers, setSelectedAnswers] = useState([])
const [result, setResult] = useState([])

console.log(result)

// ======== //
async function fetchQuizzes(){
  const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
  const data = await res.json()
  const results = data.results
  
  const shuffledQuizzes = results.map(quiz => {
    const incorrectAnswers = quiz.incorrect_answers.map(item => he.decode(item))
    const correctAnswer = he.decode(quiz.correct_answer)
    const allOptions = [...incorrectAnswers, correctAnswer]
    
    function shuffleArray(arr) {
      for (let i = 3; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return {
        id: nanoid(),
        ...quiz,
        question: he.decode(quiz.question),
        correct_answer: correctAnswer,
        options: arr
      };
    }

     return shuffleArray(allOptions);
      
    })
  setQuizzes(shuffledQuizzes)
}
  useEffect(() => {
    if(quizActive)
      fetchQuizzes()
    }, [quizActive])

  console.log(quizzes)

  console.log(selectedAnswers)

  function quizElements(){
    if(quizzes){
      return quizzes.map((quiz) =>  (
        <SingleQuiz
          key={quiz.id}
          listAnswers={listAnswers}

          id={quiz.id}
          desabled={showScore}
          question={quiz.question}
          options={quiz.options}
          correct_option={quiz.correct_answer}
          result={result}
        />
        )
      )         
    }
  }

  function listAnswers(option, id){
    setSelectedAnswers(prev => {
      const updatedAnswers = prev.filter(item => item.id !== id); 
      return [...updatedAnswers, { id, selected: option }];
    });
  }

  function checkAnswers(){
    let correctCount = 0
    quizzes.forEach(quiz =>{
      const selectedAnswer = selectedAnswers.find(ans => ans.id === quiz.id)
      if(selectedAnswer && selectedAnswer.selected === quiz.correct_answer){
        correctCount++
        setResult(prev => {
          return [...prev, {
            id: quiz.id,
            isCorrect: "correct"
          }]
        })
      }else{
        setResult(prev => {
          return [...prev, {
            id: quiz.id,
            isCorrect: "incorrect"
          }]
        })
      }
    })
    setShowScore(correctCount + "/5")
  }
  return(
    <main>

      {!quizActive && <StartGame startQuiz={() => setQuizActive(true)}/>}
      
      {
        quizActive &&
        <section id="quizzes">
          {quizElements()}
        </section>
      }
        {
          quizActive &&
          <div className="bottom">
            {showScore && <p className="score">You scored {showScore} correct answers</p>}
            <button className='btn multi-btn' onClick={checkAnswers}>Check Answers</button>
          </div>
        }

    </main>
  )
}



// https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple