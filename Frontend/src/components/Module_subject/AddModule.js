import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "./Header";

 function AddModule(){


  const [number, setModuleNumber] = useState("");
  const [name, setModuleName] = useState("");
  const [code, setModuleCode] = useState(generateRandomCode());
  const [Datet, sendDatet] = useState("");
  const [tmark, setTotalMarks] = useState("");
  const [uploader, setUploader] = useState("");

  function generateRandomCode() {
    const randomNumber = Math.random();
    const code = randomNumber.toString(36).substr(2, 6); // generate a 6 character code
    return code;
  }

    async function sendData(e){
      try {
        const response = await axios.post('http://localhost:5070/module1/addModule', {
          number ,
          name ,
          code ,
          Datet ,
          tmark ,
          uploader
        });
        if (response.data === 'Module Added') {
          Swal.fire({
            icon: 'success',
            title: 'Module added successfully',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            window.location.href="./AllModules";
          })
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error with adding module data',
          confirmButtonText: 'OK'
        });
      }
    }

    function back(){
      window.location.href='./AllModules';
    }
    return(
      <div>
      <Header/>
        <div className="col-md-5  mt-3 mx-auto mb-5" >
          <div className="rounded p-4" style={{backgroundColor:"#EAEAEA"}}>
          <h3 style={{ color: "black",textAlign:"center" }}>Module Add Page</h3><hr/><br/>
          <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Module Number:</Form.Label>
          <Form.Control type="text" placeholder="Module number"
          
          onChange={(e)=>{
            setModuleNumber(e.target.value);
          }}
          
          />
        </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Module Name:</Form.Label>
          <Form.Control type="text" placeholder="Module name" 
          onChange={(e)=>{
              setModuleName(e.target.value);
            }}/>
        </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Module Code:</Form.Label>
          <Form.Control type="text" placeholder="Module code" 
            value={code}
            onChange={(e)=>{
              setModuleCode(e.target.value);
          }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Total Marks for the Module:</Form.Label>
          <Form.Control type="text" placeholder="Total marks"
              onChange={(e)=>{
                setTotalMarks(e.target.value);
              }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" placeholder="Created date" 
            onChange={(e)=>{
              sendDatet(e.target.value);
            }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Creater:</Form.Label>
          <Form.Control type="text" placeholder="The module Uploded by" 
          onChange={(e)=>{
            setUploader(e.target.value);
          }} />
        </Form.Group>
        <div className="text-end">
          <Button variant="success" type="button" onClick={sendData}>
            Create
          </Button>&nbsp;
          <Button variant="dark" onClick={back} type="button">
            Back
          </Button>
        </div>
      </Form>

      </div>
    </div>
    </div>
    

    
    )
}

export default AddModule;

