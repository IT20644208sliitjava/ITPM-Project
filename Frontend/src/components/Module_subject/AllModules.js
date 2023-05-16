import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Modal, Button , Form } from 'react-bootstrap';

import { Trash , PencilFill} from 'react-bootstrap-icons';


import Header from './Header';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AllModule = () => {

    const columns = [
    {
        dataField: 'number',
        text: 'Module Number',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        headerStyle: { backgroundColor: 'black', color: 'white', paddingTop: '10px', paddingBottom: '10px' },
        style: { paddingTop: '10px', paddingBottom: '10px' }
    },
    {
        dataField: 'name',
        text: 'Module Name',
        sort: true,
        headerAlign: 'center',
        align: 'left',
        headerStyle: { backgroundColor: 'black', color: 'white', paddingTop: '10px', paddingBottom: '10px' },
        style: { paddingTop: '10px', paddingBottom: '10px' }
    },
    {
        dataField: 'code',
        text: 'Module Code',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        headerStyle: { backgroundColor: 'black', color: 'white', paddingTop: '10px', paddingBottom: '10px' },
        style: { paddingTop: '10px', paddingBottom: '10px' }
    },
    {
        dataField: 'tmark',
        text: 'Total Marks',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        headerStyle: { backgroundColor: 'black', color: 'white', paddingTop: '10px', paddingBottom: '10px' },
        style: { paddingTop: '10px', paddingBottom: '10px' }
    },
    {
        dataField: 'Datet',
        text: 'Created Date',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        headerStyle: { backgroundColor: 'black', color: 'white', paddingTop: '10px', paddingBottom: '10px' },
        style: { paddingTop: '10px', paddingBottom: '10px' },
        formatter: (cell) => {
            const date = new Date(cell);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
          }
    },
    
    {
        dataField: 'actions',
        text: 'Actions',
        headerAlign: 'center',
        align: 'center',
        headerStyle: { backgroundColor: 'black', color: 'white', paddingTop: '10px', paddingBottom: '10px' },
        style: { paddingTop: '10px', paddingBottom: '10px' },
        formatter: (cell, row) => (
        <div>
            <button className="btn btn-success" onClick={() => handleEditClick(row)}><PencilFill/></button>&nbsp;
            <button className="btn btn-danger ml-2" onClick={() => handleDeleteClick(row._id)}><Trash/></button>&nbsp;
            <button className="btn btn-warning ml-2" onClick={() => handleAttempClick(row)}>Attemp</button>
        </div>
        )
    }
    ];

    const defaultSorted = [{
    dataField: 'number',
    order: 'asc'
    }];

    const [searchText, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [number, setModuleNumber] = useState("");
    const [name, setModuleName] = useState("");
    const [code, setModuleCode] = useState("");
    const [Datet, sendDatet] = useState("");
    const [tmark, setTotalMarks] = useState("");
    const [uploader, setUploader] = useState("");
    const [docid, setDocId] = useState("");

    useEffect(() => {
        getData();
    }, []);

    function getData(){
        setLoading(true);
        fetch('http://localhost:5070/module1/getAllData')
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(err => {
            setError('Error loading data');
            setLoading(false);
        });
    }

    function handleAttempClick(data){
        window.location.href='./AttempNotice';
        localStorage.setItem('module', JSON.stringify(data));

    }

    function handleEditClick(data){
        console.log(data);
        setModuleNumber(data.number);
        setModuleName(data.name);
        setModuleCode(data.code);
        sendDatet(data.Datet);
        setTotalMarks(data.tmark);
        setUploader(data.uploader);
        setDocId(data._id);
        handleShow();
    }

    function handleDeleteClick(id) {
        Swal.fire({
        title: 'Are you sure you want to delete this module?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            // Make the delete API call here
            axios.delete(`http://localhost:5070/module1/delete/${id}`)
            .then((response) => {
                // If the delete was successful, refresh the table
                Swal.fire({
                    icon: 'success',
                    title: 'Module deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then((result) => {
                    getData();
                });
            })
            .catch((error) => {
                console.error(error);
            });
        }
        });
    }

  const options = {
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
  };

  function search_data(){
    setLoading(true);
    fetch('http://localhost:5070/module1/searchData/'+searchText)
    .then(res => res.json())
    .then(response => {
        setData(response.data);

        setLoading(false);
    })
    .catch(err => {
        setError('Error loading data');
        setLoading(false);
    });
  }

  function add_Module(){
    window.location.href='./AddModule';
  }

  function generate_report(data) {
    const docDefinition = {
      content: [
        {
          text: 'Module Report',
          style: 'header'
        },
        {
          style: 'table',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              ['Module Number', 'Module Name', 'Module Code', 'Mark'],
              ...data.map(row => [row.number, row.name, row.code, row.tmark])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        table: {
          margin: [0, 5, 0, 15],
          width: '100%'
        }
      }
    };
  
    pdfMake.createPdf(docDefinition).open();
  }
  

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
          axios.put(`http://localhost:5070/module1/updateModule/${docid}`, { name, tmark })
            .then((response) => {
              console.log(response.data); // handle success response
                Swal.fire({
                    icon: 'success',
                    title: 'Module updated successfully',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {
                    getData();
                    setShow(false);
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
      });
    }

  return (
    <div>
    <Header/>
    <div className="container">
       <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Module Number:</Form.Label>
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
            <Form.Control type="text" placeholder="Created date" 
                disabled
                value={Datet}
                onChange={(e)=>{
                sendDatet(e.target.value);
                }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Creater:</Form.Label>
            <Form.Control type="text" placeholder="The module Uploded by" 
            disabled
            value={uploader}
            onChange={(e)=>{
                setUploader(e.target.value);
            }} />
            </Form.Group>
            
           
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success"  onClick={update_module}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <h3 className="text-left my-4">Module List</h3>
      <hr/>
      <div className='p-4 rounded mb-2' style={{backgroundColor:'#D9DCD4'}}>
        <h4>Filter Module</h4>
        <hr/>
        <div className='row mb-3'>
            <div className='col'>
                <input type='text' className='form-control' placeholder='Search Using Module Name'  onChange={(e) =>{
                                                            setSearch(e.target.value);
                                                        }}/>
            </div>
            <div className='col'>
                <button className='btn btn-dark' onClick={search_data}>Search</button>&nbsp;
                <button className='btn btn-outline-dark' onClick={getData }>Clear</button>
            </div>
        </div>
      </div>
      <div className='text-end mt-5 mb-3'>
          <button className='btn btn-dark' onClick={add_Module}>Add New Module</button>&nbsp;                                                 
          <button className='btn btn-dark' onClick={()=>generate_report(data)}>Report Generate</button>                                                  
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <BootstrapTable
          keyField="_id"
          data={data}
          columns={columns}
          defaultSorted={defaultSorted}
          pagination={paginationFactory(options)}
          wrapperClasses="table-responsive"
        />
      )}
    </div>
    </div>
  );
};

export default AllModule;
