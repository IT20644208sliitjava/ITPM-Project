import React, {useState , useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "../Header";

 function AddModule(){


    function cancel(){
      window.location.href='./StudentModule';
    }
    const [moduleName, setModuleName] = useState("");
    const [moduleCode, setModuleCode] = useState("");

    useEffect(() => {
        var module = localStorage.getItem('module');
        const data = JSON.parse(module);

        setModuleName(data.name)
        setModuleCode(data.code)

    });

    return(
      <div>
      <Header/>
        <div className="col-md-5  mt-3 mx-auto mb-5" >
          <div className="rounded p-4" style={{backgroundColor:"#EAEAEA"}}>
            
            <h1>Academic Integrity for Quizzes</h1>
            
            <hr/>
            <br/>
            <h6>Module Name : {moduleName}</h6>
            <h6>Module Code : {moduleCode}</h6>
            <br/>
            <p style={{textAlign:'justify'}}>Please read the following statement and agree to it before proceeding to the quiz.</p>
            <p style={{textAlign:'justify'}}>As a student, I understand that academic integrity is essential to the success of the university's educational mission. I agree to take this quiz without any assistance from other persons, materials, or devices. I understand that any violation of academic integrity, including cheating or plagiarism, will result in appropriate disciplinary action.</p>
            <div>
                <input type="checkbox" id="agreement" required />
                <label for="agreement">I agree to the statement above.</label>
                <br/>
                <div className="text-end mt-4">
                    <button type="submit" className="btn btn-dark">Start Quiz</button>&nbsp;
                    <button type="submit" className="btn btn-outline-dark" onClick={cancel}>Cancel</button>
                </div>
            </div>

      </div>
    </div>
    </div>
    

    
    )
}

export default AddModule;

