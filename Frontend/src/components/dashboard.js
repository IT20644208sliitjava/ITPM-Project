import React, { useState , useEffect } from 'react';
import {
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import Header from "./Header";

function MainDashboard() {

    
    return (

        <div>
            <Header/>
            <div className='container'>
                <h3 className='mt-3'>MAIN DASHBOARD</h3>
                <hr/>
            </div>
            <div className='container'>
                <div class="card text-bg-dark">
                    <img src="./dash_bg.jpg" class="card-img" alt="..." />
                </div>
            </div>
            
        </div>

    );
}

export default MainDashboard;