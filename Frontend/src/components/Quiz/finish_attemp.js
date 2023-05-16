import React, { useState , useEffect } from 'react';
import {
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import jsPDF from 'jspdf';
import '../../App.css';


function FinishAttemps() {

 

    const [subject, setSubject] = useState('');
    const [exam_title, setTitle] = useState('');
    const [exam_code, setExamCode] = useState('');
    const [questionCount, setQuestionCount] = useState('');
    const [duration, setDuration] = useState('');
    const [total, setTotal] = useState('');
    const [picUnderState, setPicUnderState] = useState('The Exam is Completed Successfully.');
    const [bgcolor, setBgColor] = useState('#EBEBEB');
    const [bgImage, setBgImage] = useState("https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg");
    

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('question'));

      setSubject(data.subject);
      setTitle(data.exam_title);
      setExamCode(data.exam_code);
      setDuration(data.duration);
      setQuestionCount(data.question_count);
      var currect_answers_count = localStorage.getItem('currect_answers_count');
      setTotal(currect_answers_count);

      if(parseFloat(currect_answers_count) > parseFloat((parseFloat(data.question_count)*0.50))){
        setPicUnderState('The Exam is Completed Successfully.');
        setBgColor('#EBEBEB');
        setBgImage("./img/cong.png");
    }else{
        setPicUnderState('You Scored Low Marks. Try Again');
        setBgColor('#E5C9C9');
        setBgImage("https://www.ruseducation.in/wp-content/uploads/2022/04/how-to-prepare-for-class-12-term-2-board.webp");

      }
    

    }, []);

    function back(){
        window.location.href="./ExamDashboard";
    }

    async function generateCertificate(courseName, studentName, completionDate, marks) {
        // Create a new PDF document
        const doc = new jsPDF();

        // Add a header to the PDF document
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('Congratulations!', 105, 30, { align: 'center' });

        // Add a paragraph to the PDF document
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.text(`Dear ${studentName},

        It gives us great pleasure to congratulate you on successfully completing the ${courseName} course. Your dedication, hard work, and perseverance have paid off, and we are proud of your achievement. We hope that the knowledge and skills you have gained during this course will serve you well in your future endeavors.
        
        We are confident that you will continue to achieve great things, and we wish you all the best in your future endeavors. Once again, congratulations on your success!
        `, 20, 60, {
          maxWidth: 180,
          maxHeight: 200,
        });

        // Add the student name and course completion date to the PDF document
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text(`Name: ${studentName}`, 20, 150);
        doc.text(`Course: ${courseName}`, 20, 170);
        doc.text(`Completion Date: ${completionDate}`, 20, 180);
        doc.text(`Marks: ${marks}`, 20, 190);

        // Save the PDF document
        doc.save(`${studentName} - ${courseName} Completion Certificate.pdf`);
    }

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
          
            <div className='row  mt-3'>

              <div className='col-12 rounded p-4' style={{backgroundColor:bgcolor}}>
                <div className='text-center pt-5 pb-4'>
                        <img src={bgImage} style={{width:'35%'}} />
                        <h5 className='mt-3'>{picUnderState}</h5>
                        <br/>
                        <br/>
                        <br/>
                        <h1>You Answered For {total} Questions from {questionCount}</h1>
                        
                        <br/>
                        <br/>
                        <div>
                            <button className='btn btn-dark shadow-0 btn-lg' onClick={back}>Explore More Courses</button>&nbsp;
                            <button className='btn btn-dark shadow-0 btn-lg' onClick={()=>generateCertificate(exam_title, "Nadun Sandeepa", new Date().toLocaleDateString('en-GB'), total)}>Download Certificate</button>
                        </div>
                </div>
              </div>
              
            </div>
            <br/>
        </div>

    );
}

export default FinishAttemps;