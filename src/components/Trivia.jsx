import { useEffect, useState } from "react"
import useSound from "use-sound"
import play from "../Sounds/play.mp3"
import wrong from "../Sounds/wrong.mp3"
import correct from "../Sounds/correct.mp3"

const Trivia = ({data, setStop, questionNumber, setQuestionNumber}) => {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [className, setClassName] = useState('answer')
    const [letsPlay] = useSound(play)
    const [corrrectAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)

    useEffect(() => {
        letsPlay();
    },[letsPlay])



    useEffect(() =>{
        setQuestion(data[questionNumber - 1])
    },[data,questionNumber])

    const delay = (duration, callback) =>{
        setTimeout(() => {
            callback()
        }, duration);
    }

    const handleClick = (a) => {
        setSelectedAnswer(a)
        setClassName('answer active')
        delay(3000, () => 
        setClassName(a.correct ? "answer correct" : "answer wrong")
        )
        delay(5000, () => {
        if(a.correct){
            corrrectAnswer();
            delay(1000, () => { 
            setQuestionNumber((prev) => prev + 1)
            setSelectedAnswer(null)
        });
        }else{
            wrongAnswer();
            delay(1000, () => {
                setStop(true)
            })
        }
        })
    }


  return (
    <div className="trivia">
    <div className="question"> {question?.question} </div>
    <div className="answers">
    {
    question?.answers.map((e) => (
        <div className={selectedAnswer === e ? className : "answer"} onClick={() => handleClick(e)} > {e.text} </div>
    ))
    }
        
    </div>
      
    </div>
  )
}

export default Trivia
