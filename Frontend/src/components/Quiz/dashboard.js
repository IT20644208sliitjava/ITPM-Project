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

function Dashboard() {

    const [quizzes, setQuizzes] = useState([]);
    const [search_text, setSearchText] = useState("");

    useEffect(() => {
      axios.get('http://localhost:5000/exam/getAllExam')
        .then(response => {
          setQuizzes(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    function AttempQuestion(data){
        window.location.href="./AttempQuestion?exam_code="+data.exam_code;
        localStorage.setItem('question',JSON.stringify(data));

    }

    function search(){
        axios.get('http://localhost:5000/exam/searchExam/'+search_text)
        .then(response => {
          setQuizzes(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    function clear(){
        axios.get('http://localhost:5000/exam/getAllExam')
        .then(response => {
          setQuizzes(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    
    return (
        <div className='container'>
            <div style={{border:'1px solid #DFE6E7'}} className='p-4 rounded'>
                <h3>Exam List</h3>
                <hr/>
                <div>
                    <div className='row'>
                        <div className='col'>
                            <input type='text' placeholder='Search Using Name' className='form-control'  value={search_text} onChange={(e) =>{
                                                            setSearchText(e.target.value);
                                                        }}/>
                        </div>
                        <div className='col'>
                            <button className='btn btn-success shadow-0 ' style={{borderRadius:'0px'}} onClick={search}>Search</button>
                            <button className='btn btn-dark shadow-0 ' onClick={clear} style={{borderRadius:'0px'}} >Clear</button>
                        </div>
                    </div>
                </div>
                <br/>
                {quizzes.map((quiz, index) => (
                    <div className="card mt-3" style={{backgroundColor:'#DDDDDD'}}>
                        <div className="card-body">
                            <div className='row' key={index}>
                                <div className='col'>
                                        <h5 style={{color:'#0C0C0C'}}>{quiz.exam_title}</h5>
                                        <div className='row mt-3' >
                                            <div className='col-2'>
                                                <MDBIcon fas icon="chalkboard" /> <span>{quiz.subject}</span>
                                            </div>
                                            <div className='col-3'>
                                                <MDBIcon fas icon="stopwatch" /> <span>{quiz.duration} Mins</span>
                                            </div>
                                            <div className='col-4'>
                                                <MDBIcon fas icon="question-circle" /> <span>{quiz.question_count} Questions</span>
                                            </div>
                                        </div>
                                </div>
                                <div className='col text-end'>
                                        <button className='btn btn-outline-dark shadow-0 mt-3' onClick={()=>AttempQuestion(quiz)}> Attemp <MDBIcon fas icon="arrow-right" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>

    );
}

export default Dashboard;