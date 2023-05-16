import React, {useState , useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "../Header";

 function UpdateModule(){

  const [number, setModuleNumber] = useState("");
  const [name, setModuleName] = useState("");
  const [code, setModuleCode] = useState();
  const [Datet, sendDatet] = useState("");
  const [tmark, setTotalMarks] = useState("");
  const [uploader, setUploader] = useState("");
  const [ob_id, setOBID] = useState("");

  useEffect(() => {
    var data_from_local = localStorage.getItem("update_moduel");
    var module_arr = JSON.parse(data_from_local);
    setModuleNumber(module_arr.number);
    setModuleName(module_arr.name);
    setModuleCode(module_arr.code);
    setOBID(module_arr._id);
    const inputDate = new Date(module_arr.Datet);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    sendDatet(formattedDate);
    setTotalMarks(module_arr.tmark);
    setUploader(module_arr.uploader);
  },[])



    
  function update_module(){
    Swal.fire({
        title: 'Are you sure you want to update this module?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          fun_do_action(ob_id);
        }
      });
  }

    function fun_do_action(ob_id){
      axios.put(`http://localhost:5070/module1/updateModule/${ob_id}`, { name , Datet , tmark , uploader })
      .then((response) => {
        console.log(response.data); // handle success response
          Swal.fire({
              icon: 'success',
              title: 'Module updated successfully',
              showConfirmButton: false,
              timer: 1500,
          }).then((result) => {
              window.location.href="./AllModules";
          });
      })
      .catch((error) => {
        console.log(error); // handle error response
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
    }
    function back(){
      window.location.href='./AllModules';
    }
    return(
      <div>
      <Header/>
        <div className="col-md-5  mt-3 mx-auto mb-5" >
          <div className="rounded p-4" style={{backgroundColor:"#EAEAEA"}}>
          <h3 style={{ color: "black",textAlign:"center" }}>Module Update Page</h3><hr/><br/>
          <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Module Number:</Form.Label>
          {/* this feild can not edit */}
          <Form.Control type="text" placeholder="Module number"
          value={number}
          disabled
          onChange={(e)=>{
            setModuleNumber(e.target.value);
          }}
          
          />
        </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Module Name:</Form.Label>
          <Form.Control type="text" placeholder="Module name" 
          value={name}
          onChange={(e)=>{
              setModuleName(e.target.value);
            }}/>
        </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Module Code:</Form.Label>
          {/* this feild can not edit */}
          <Form.Control type="text" placeholder="Module code" 
            value={code}
            disabled
            onChange={(e)=>{
              setModuleCode(e.target.value);
          }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Total Marks for the Module:</Form.Label>
          <Form.Control type="text" placeholder="Total marks"
              value={tmark}
              onChange={(e)=>{
                setTotalMarks(e.target.value);
              }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" placeholder="Created date" 
            value={Datet}
            onChange={(e)=>{
              sendDatet(e.target.value);
            }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Creater:</Form.Label>
          <Form.Control type="text" placeholder="The module Uploded by" 
          value={uploader}
          onChange={(e)=>{
            setUploader(e.target.value);
          }} />
        </Form.Group>
        <div className="text-end">
          <Button variant="success" type="button" onClick={update_module}>
            Update
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

export default UpdateModule;

