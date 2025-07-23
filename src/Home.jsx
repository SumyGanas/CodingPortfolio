import React from 'react'
import HeaderBar from './nav/HeaderBar.jsx';
import FooterBar from './footer/footer.jsx';

const Home = () => {
    return (
      <>  <div id="home-main">
          <div className="container" id="nav-bar">
            <HeaderBar />
          </div>
          
          <div className="container" id="headerbox">
            <div>  
            <div className="jumbotron p-3 p-md-5 text-white rounded" id="home" alt="Header image of a laptop with code on the screen with a blurry dark background; Photo by Blake Connally on Unsplash">
                <div className="col-md-6 px-0 sura-regular">
                  <h1 className="display-4">Welcome to my Developer Portfolio!</h1>
                  <p className="lead my-3"> Here you’ll find projects where I work with automation, AI, and cloud tools. These projects reflect my technical skills, my problem-solving approach, and my ongoing growth as a software developer.</p>
                </div>
              </div>
              </div>
          </div>
        <main role="main" className="container my-5 p-3 p-md-5 rounded sura-regular"id="hometextbox">
        <div className="card-deck mt-4 mb-3 gx-5 px-5 text-center">
          <div className="card mb-4 box-shadow">
            <div className="card-header"> <h4 className="lead my-1">About Me</h4> </div>
            <div className="card-body px-5 mt-4 mb-2" id='intro-body'> 
            
            <p>Hi, and thanks for visiting! I’m a software developer based in San Jose, CA, available to start work immediately. I am fully authorized to work in the U.S. and do not require sponsorship or relocation assistance.</p>

            <p>This portfolio features two projects that showcase different sides of my skill set, each with an architecture diagram and a detailed explanation of the design decisions behind the code.</p>

            <p>The first project is a fully automated trading bot that executes real-time trades daily. It visualizes performance through a line chart that compares the bot’s daily profit and loss percentage changes alongside movements in SPY (the S&P 500 index fund).</p> 
            
            <p>The second project is an AI-powered tool that tracks daily sales and discounts on Ulta’s retail site, using Google’s Gemini AI to analyze deals based on user-selected preferences and overall value.</p>

            <p>Through these projects, I demonstrate my ability to build full-stack web applications, work with public APIs, document code clearly, and design backend cloud infrastructure, supported by my Google Cloud Associate Cloud Engineer certification.</p>

            <p>Additionally, my background in business provides a strong foundation for aligning technical solutions with company goals and customer needs. I am excited to bring this combination of technical expertise and business insight to a forward-thinking engineering team, where I can contribute to building impactful, high-quality products.</p>
            </div>
          </div>
          </div>
        </main>

          <a href="#nav-bar" style={{display : 'block', padding : '12px', textAlign : "center"}}>Back to top</a>
          <br/> <br/>  <br/>  <br/>
          <FooterBar />
          </div>
      </>
    );}
    
    export default Home;
