import React from 'react'
import HeaderBar from './HeaderBar.js';
import AboutMe from './static_files/aboutme.js';

const Home = () => {
    return (
      <>  <div id="home-main">
          <div className="container" id="nav-bar">
            <HeaderBar />
          </div>
          
          <div className="container" id="headerbox">
            <div>  
            <div className="jumbotron p-3 p-md-5 text-white rounded" id="home">
                <div className="col-md-12 px-0">
                  <h1 className="display-3">Welcome to my Project Portfolio!</h1>
                  
                  
                </div>
              </div>
              </div>
          </div>
        <main role="main" className="container my-5 p-3 p-md-5 rounded"id="hometextbox">
            <div className="row gx-5 px-5">
            <div className="col blog-main mx-2 px-5">
                <h2 className="pb-3 pt-3 mb-5 text-black border-bottom border-dark"> About Me</h2>
                <div className="blog-post">
                    <AboutMe />
                </div>
                <h2 className="pb-3 pt-3 mb-5 text-black border-bottom border-dark"> My Resume </h2>
                <div className="blog-post">
                    
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
          </div>
      </>
    );}
    
    export default Home;