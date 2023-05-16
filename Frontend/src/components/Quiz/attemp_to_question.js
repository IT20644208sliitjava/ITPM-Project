import React, { useState , useEffect } from 'react';
import {
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function AttempBeforeMessage() {

    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [giveAnswer, setGiveAnswer] = useState([]);
    const [currectAnswer, setCurrentAnswer] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const [subject, setSubject] = useState('');
    const [exam_title, setTitle] = useState('');
    const [exam_code, setExamCode] = useState('');
    const [questionCount, setQuestionCount] = useState('');
    const [duration, setDuration] = useState('');
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('question'));

      setSubject(data.subject);
      setTitle(data.exam_title);
      setExamCode(data.exam_code);
      setDuration(data.duration);
      setQuestionCount(data.question_count);
      setMinutes(duration);

      axios.get('http://localhost:5000/exam/totalQuestionsForExam/'+data.exam_code)
      .then(response => {
        
        setQuestions(response.data);
        setSelectedAnswers(response.data.map(question => 0)); 
        setCurrentAnswer(response.data.map(question => question.currectAnswer)); 
        
        const giveAnswerList = new Array(response.data.length).fill(false);
        setGiveAnswer(giveAnswerList);
        
      })
      .catch(error => {
        console.error(error);
      });
    }, []);

    function handleAnswerSelection(index, answer , select_item) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[index] = answer;
      setSelectedAnswers(updatedAnswers);

      giveAnswer[index]  = (currectAnswer[index] == select_item);
    
    }
  
    function handleSubmit() {
      const data = JSON.parse(localStorage.getItem('question'));

     
      localStorage.setItem('currect_answers_count',calculateResult());
      window.location.href="./FinishAttemps";
    }
  
    function handleReset() {
      setSelectedAnswers(new Array(questions.length).fill(null));
      setShowResult(false);
    }
  
    function calculateResult() {
      return giveAnswer.filter(value => value === true).length;
    }
   

    useEffect(() => {
      let myInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    });
    

    return (
        <div className='container'>
           <div style={{ 
              backgroundImage: "url('https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding :'2%',
              marginTop:'3%',
              borderRadius:'5px'
            }}>
              <h2 className='pt-4'>{exam_title}</h2>
              <div style={{paddingLeft:'2%'}}>
             
                  <MDBIcon fas icon="chalkboard" /> <span>{subject}</span><br/>
              
                  <MDBIcon fas icon="stopwatch" /> <span>{duration} Mins</span><br/>
              
                  <MDBIcon fas icon="question-circle" /> <span>{questionCount} Questions</span>
                
              </div>
            </div>
            <div className='text-end  mt-5'>
                <h5>Timer : <span>{minutes.toString().padStart(2, "0")}:
                                  {seconds.toString().padStart(2, "0")} Minutes</span> </h5>
            </div>
            <div className='row  mt-3'>

              <div className='col-9 p-4' style={{backgroundColor:'#DAD7CE'}}>
               
              {questions.map((question, index) => (
                <div key={index}>
                  <h5>{index+1} . {question.question}</h5>
                  <ul style={{listStyle: "none"}}>
                    <li>
                      <input type="radio" name={`question${index}`} value={question.optionOne} checked={selectedAnswers[index] === question.optionOne} onChange={() => handleAnswerSelection(index, question.optionOne , 1)} />
                      &nbsp;{question.optionOne}
                    </li>
                    <li>
                      <input type="radio" name={`question${index}`} value={question.optionTwo} checked={selectedAnswers[index] === question.optionTwo} onChange={() => handleAnswerSelection(index, question.optionTwo , 2)} />
                      &nbsp;{question.optionTwo}
                    </li>
                    <li>
                      <input type="radio" name={`question${index}`} value={question.optionThree} checked={selectedAnswers[index] === question.optionThree} onChange={() => handleAnswerSelection(index, question.optionThree , 3)} />
                      &nbsp;{question.optionThree}
                    </li>
                    <li>
                      <input type="radio" name={`question${index}`} value={question.optionFour} checked={selectedAnswers[index] === question.optionFour} onChange={() => handleAnswerSelection(index, question.optionFour , 4)} />
                      &nbsp;{question.optionFour}
                    </li>
                  </ul>
                  <br/>
                  <hr/>
                  <br/>
                </div>
              ))}
              <div className='text-center'>
                <p>If you are do quize successfully, submit answers.</p>
              <button className='btn btn-success shadow-0' onClick={handleSubmit}>Submit</button>
              </div>
              {showResult && (
                <div>
                  <p>Your score is {calculateResult()} out of {questions.length}.</p>
                  <button onClick={handleReset}>Reset</button>
                </div>
              )}
              </div>
              <div className='col-3'>
                {Array.from({ length: questionCount }, (_, i) => i + 1).map((num) => (
                   <div className='p-2 rounded m-1' style={{backgroundColor:'#DAD7CE'}}>
                     
                     <h5>Question {num}</h5>
                   </div>
                ))}
              </div>
            </div>
            <br/>
        </div>

    );
}

export default AttempBeforeMessage;