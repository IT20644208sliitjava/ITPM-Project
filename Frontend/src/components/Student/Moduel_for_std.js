import React, { useState, useEffect } from 'react';



function StdModulesPage() {

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

  function attemp(module){
    localStorage.setItem('module' , JSON.stringify(module));
    window.location.href="./AttempNotice";
  }

  return (
    <div>
      <div className="text-center" style={{paddingTop:'10%' , paddingBottom:'10%' , backgroundColor:'black' , color:'white'}}>
        <h1>EXPLORE MODULES </h1>
        <span className="text-muted">HOME / MODULES</span>
      </div>
      <div className="container mt-5">
        <div class="row row-cols-1 row-cols-md-3 g-4">
        {data.map((module, index) => (
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">{module.name}</h3>
                <span class="card-text">Total Marks : {module.tmark}</span><br/>
                <span class="card-text">Created Date : {module.Datet}</span><br/>
                <span>Create By : {module.uploader}</span>
              </div>
              <div  class="card-footer text-end pt-4 pb-3">
                <button className='btn btn-outline-dark' onClick={()=>attemp(module)}>Atttemp </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default StdModulesPage;
