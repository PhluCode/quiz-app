import { useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';
import { useRef } from 'react';

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [questions, setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [text, setText] = useState('')

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let Option_array = [Option1, Option2, Option3, Option4];

    function Next() {

        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true)
                if (score === 10) {
                    setText("Congratulations, you did a great job.");
                } else if (score <= 5) {
                    setText("That was a nice try, keep trying.")
                } else if (score > 5) {
                    setText("You've almost got it, keep up the good work.")
                }
                return 0; 
                // จะไม่ทำด้านล่างต่อ
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            Option_array.map(index => {
                index.current.classList.remove('wrong');
                index.current.classList.remove('correct');
                return null;
            })
        }
    }

    function Check(e, ans) {
        if (lock === false) {
            if (ans === questions.answer) {
                e.target.classList.add('correct')
                setLock(true)
                setScore(prev=>prev+1)
             } else {
                e.target.classList.add('wrong')
                setLock(true)
                let correctOption = Option_array[questions.answer-1];
                correctOption.current.classList.add('correct')
             }
        }
    }

    function Reset() {
        setResult(false)
        setIndex(0)
        setQuestion(data[0])
        setLock(false)
        setScore(0)
    }

  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {result? 
        <>
            You Scored {score} out of {data.length}!
            <p>{text}</p>
            <button onClick={() => Reset()}>Reset</button>
        </> 
        : 
        <>
            <h2>{index+1}. {questions.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e)=> Check(e,1)}>{questions.option1}</li>
                <li ref={Option2} onClick={(e)=> Check(e,2)}>{questions.option2}</li>
                <li ref={Option3} onClick={(e)=> Check(e,3)}>{questions.option3}</li>
                <li ref={Option4} onClick={(e)=> Check(e,4)}>{questions.option4}</li>
            </ul>
            <button onClick={Next}>Next</button>
            <div className="index">{index+1} of {data.length} questions</div>
        </>}
    </div>
  )
}

export default Quiz