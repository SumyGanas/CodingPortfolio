import React from 'react'
import HeaderBar from './HeaderBar.js';


const ResumeApp = () => {
return (
  <>
      <div className="container" id="nav-bar">
        <HeaderBar />
      </div>
      
      <div className="container" id="headerbox">
        <div>  
        <div className="jumbotron p-3 p-md-5 text-white rounded" id="resume">
            <div className="col-md-6 px-0">
              <h1 className="display-4">TBD App</h1>
              <p className="lead my-3">I dunno yet some stuff</p>
              <p className="lead mb-0"><a href="#htmldata" className="text-white font-weight-bold">Read More...</a></p>
            </div>
          </div>
          </div>
      </div>

      <div className="container my-3 py-2" id="chartbox" >
        <div className="card-deck mt-3 mb-3 gx-5 px-5 text-center">
          <div className="card mb-4 box-shadow">
            <div className="card-header"> <h4 className="lead my-1">My app probably goes here</h4> </div>
            <div className="card-body" id="portcol"> </div>
          </div>
          <div className="card mb-4 box-shadow">
            <div className="card-header"> <h4 className="lead my-1">Dunno what goes here</h4> </div>
            <div className="card-body" id="spycol"> </div>
          </div>
          </div>
      </div>

      <main role="main" className="container"id="textbox">
        <div className="row gx-5 px-5">
          <div className="col blog-main mx-2 px-5">
            <h2 className="pb-3 pt-3 mb-4 border-bottom"> TBD App</h2>
            <div className="blog-post" id="htmldata">
                <p className="blog-post-meta"> May 10, 2024 by <a href="https://www.linkedin.com/in/sumy-ganas-201a89308/" rel="noreferrer" target="_blank">Sumy</a> </p>
                <p>It do be empty like that sometimes</p>
            </div>
          </div>
        </div>
      </main>

      <br/> <br/>  <br/>  <br/>
      <footer className="blog-footer">
        <p style={{display : 'block', padding : '12px', textAlign : "center"}}>All Rights Reserved. Made by Sumy Ganas 2024.</p>
        <p>
          <a href="#nav-bar" style={{display : 'block', padding : '12px', textAlign : "center"}}>Back to top</a>
        </p>
      </footer>
  </>
);}

export default ResumeApp;
