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


import Header from '../Header';

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
      dataField: 'uploader',
      text: 'Uploader',
      sort: true,
      headerAlign: 'center',
      align: 'center',
      headerStyle: { backgroundColor: 'black', color: 'white', paddingTop: '10px', paddingBottom: '10px' },
      style: { paddingTop: '10px', paddingBottom: '10px' }
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


    function handleEditClick(data){
        console.log(data);
        localStorage.setItem("update_moduel", JSON.stringify(data));
        window.location.href="./UpdateModule";
  
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
  


  return (
    <div>
    <Header/>
    <div className="container">
      
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
