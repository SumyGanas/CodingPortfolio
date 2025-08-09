import React from 'react'
import HeaderBar from './nav/HeaderBar.jsx';
import FooterBar from './footer/footer.jsx';

const Home = () => {
    return (
      <>  <div id="home-main">
          <div className="container my-3" id="nav-bar">
            <HeaderBar />
          </div>
          
          <div className="container" id="headerbox">
            <div>  
            <div className="jumbotron text-white rounded" id="home" alt="Header image of a laptop with code on the screen with a blurry dark background; Photo by Blake Connally on Unsplash">
                <div className="col-md-6 px-0 sura-regular">
                  <h1 className="display-4">Welcome to my Developer Portfolio!</h1>
                  <p className="lead my-3"> Here you’ll find web apps demonstrating my ability to work with cloud tools, automation, and AI. These projects reflect my problem-solving approach and ongoing growth as a software developer.</p>
                </div>
              </div>
              </div>
          </div>
        <main role="main" className="container my-3 py-2 sura-regular" id="chartbox">
        <div className="card-deck mt-4 mb-3 gx-5 px-5 text-center">
          <div className="card mb-4 box-shadow">
            <div className="card-header"> <h4 className="lead my-1">About Me</h4> </div>
            <div className="card-body px-5 mt-4 mb-2" id='intro-body'> 
            
            <p>Hi, and thank you for visiting! I’m a software developer based in San Jose, CA, ready to start immediately. I am fully authorized to work in the U.S. and do not require sponsorship or relocation assistance. I'm a certified Google Cloud Associate Cloud Engineer. My background in business provides a unique perspective for aligning technical solutions with company goals and customer needs. I am excited to join a forward-thinking engineering team and contribute to building impactful and high-quality products.</p>

            <p>This portfolio features two projects that showcase different sides of my skill set, each with an architecture diagram and a detailed explanation of the design decisions behind the code.</p>
            
            <ol>
            <li><p>A fully automated trading bot that executes real-time trades daily. It visualizes portfolio performance through an interactive line chart that highlights the bot’s daily profit and loss percentage changes alongside movements in SPY (the S&P 500 index fund).</p></li>
            <li><p>A sales tracker that uses AI to analyze and deliver products. It tracks daily sales and discounts on Ulta’s retail site and provides the best suited products based on either user-selected preferences, or overall discount value.</p></li>
            </ol>
            
            <p>Through these projects, I demonstrate my ability to: <ul>
            <li>Build full-stack, scalable, and responsive web applications</li>
            <li>Design backend cloud infrastructure using secure coding practices</li>
            <li>Integrate AI solutions</li>
            <li>Work with public APIs and open source software</li>
            <li>Document code clearly</li>
            
              </ul> </p>

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
