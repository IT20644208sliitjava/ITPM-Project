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

function AddQuestion() {

    const [subject, setSubject] = useState('');
    const [exam_title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    
    const [exam_code, setExamCode] = useState(generateRandomCode());
    const [exam_disabled, seExamDisabled] = useState(false);

    const [quiz_title, setQuestionTitle] = useState('');
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [optionThree, setOptionThree] = useState('');
    const [optionFour, setOptionFour] = useState('');
    const [currentOption, setCurrentOption] = useState('');

    function generateRandomCode() {
        const randomNumber = Math.random();
        const code = randomNumber.toString(36).substr(2, 6); // generate a 6 character code
        return code;
      }

    function save_question(){

        const url = 'http://localhost:5000/oneQuestion/addQuestion';

        axios.post(url, {
            exam : Cookies.get('exam_code'),
            question : quiz_title,
            optionOne: optionOne,
            optionTwo: optionTwo,
            optionThree: optionThree,
            optionFour: optionFour,
            answer: currentOption
        }).then((response) => {
            Swal.fire({  
                title: "Success!",
                text: "Question is Saved",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"});

                setOptionOne('');
                setOptionTwo('');
                setOptionThree('');
                setOptionFour('');
                setCurrentOption('');
            
        }).catch((error) => {
            Swal.fire({  
                title: "Error!",
                text: "Question is Not Saved.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"});
        });
    }
      
    function save_exam(){

        const url = 'http://localhost:5000/exam/addExam';

        axios.post(url, {
            subject,
            exam_title,
            exam_code,
            duration
        }).then((response) => {
            Swal.fire({  
                title: "Success!",
                text: "Exam is Created",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"});
                Cookies.set('exam_code', exam_code);
                seExamDisabled(true);
            
        }).catch((error) => {
            Swal.fire({  
                title: "Error!",
                text: "Exam is Not Created.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"});
        });
    }
    
    return (
        <div className='container'>
            <div style={{border:'1px solid #DFE6E7'}} className='p-4 rounded'>
                <h3>Add New Question</h3>
                <hr/>
                <div style={{backgroundColor:'#F1F1EE'}} className='p-4 rounded'>
                <div className='row'>
                    <div className='col'>
                        <label>Subject : </label>
                        <select className='form-select' disabled={exam_disabled} onChange={(e) =>{
                                                            setSubject(e.target.value);
                                                        }}>
                            <option value="">Select Subject</option>
                            <option value="web">Web Developing</option>
                        </select>
                    </div>

                    <div className='col'>
                        <label>Main Title : </label>
                        <MDBInput className='bg-white' disabled={exam_disabled} onChange={(e) =>{
                                                            setTitle(e.target.value);
                                                        }} />
                    </div>
                    <div className='col'>
                        <label>Exam Duration (Min): </label>
                        <MDBInput className='bg-white' disabled={exam_disabled} onChange={(e) =>{
                                                            setDuration(e.target.value);
                                                        }} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col text-end'>
                        <MDBBtn color="dark" className='shadow-0 mt-3' disabled={exam_disabled} onClick={save_exam}>Save</MDBBtn>
                    </div>
                </div>
                </div>
                <div style={{backgroundColor:'#DEEBDF'}} className='p-4 rounded mt-4'>
                    <div className='row'>
                        <div className='col'>
                            <label>Question Title : </label>
                            <MDBInput className='bg-white' value={quiz_title} onChange={(e) =>{
                                                            setQuestionTitle(e.target.value);
                                                        }}/>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='col'>
                            <label>Option One : </label>
                            <MDBInput className='bg-white' value={optionOne} onChange={(e) =>{
                                                            setOptionOne(e.target.value);
                                                        }}/>
                        </div>
                        <div className='col'>
                            <label>Option Two : </label>
                            <MDBInput className='bg-white' value={optionTwo} onChange={(e) =>{
                                                            setOptionTwo(e.target.value);
                                                        }}/>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col'>
                            <label>Option Three : </label>
                            <MDBInput className='bg-white' value={optionThree} onChange={(e) =>{
                                                            setOptionThree(e.target.value);
                                                        }}/>
                        </div>
                        <div className='col'>
                            <label>Option Four : </label>
                            <MDBInput className='bg-white' value={optionFour} onChange={(e) =>{
                                                            setOptionFour(e.target.value);
                                                        }}/>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col' onChange={(e) =>{
                                                            setCurrentOption(e.target.value);
                                                        }}>
                            <label>Correct Option : </label>
                            <select className='form-select'>
                                <option value="">Select Correct Option </option>
                                <option value="1">{optionOne}</option>
                                <option value="2">{optionTwo}</option>
                                <option value="3">{optionThree}</option>
                                <option value="4">{optionFour}</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col text-end'>
                            <MDBBtn color="dark" className='shadow-0 mt-3' onClick={save_question}>Add This Question</MDBBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddQuestion;