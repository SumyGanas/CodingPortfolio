import TradingViewWidget from './tradingview.js';
import './App.css';
import LineChart from './portchart.js';
import HtmlData from './static_files/text.js';
import React from 'react'
import HeaderBar from './HeaderBar.js';

const TradingApp = () => {

return (
  <>
      <div className="container" id="nav-bar">
        <HeaderBar />
      </div>
      
      <div className="container" id="headerbox">
        <div>  
        <div className="jumbotron p-3 p-md-5 text-white rounded" id="trading">
            <div className="col-md-6 px-0">
              <h1 className="display-4">Trading Bot</h1>
              <p className="lead my-3">Fully automated algo-trading bot that analyzes the market and continues to buy and sell stock</p>
              <p className="lead mb-0"><a href="#htmldata" className="text-white font-weight-bold">Read More...</a></p>
            </div>
          </div>
          </div>
      </div>

      <div className="container my-3 py-2" id="chartbox" >
        <div className="card-deck mt-3 mb-3 gx-5 px-5 text-center">
          <div className="card mb-4 box-shadow">
            <div className="card-header"> <h4 className="lead my-1">Portfolio Data from Alpaca &#40;updated daily&#41; </h4> </div>
            <div className="card-body" id="portcol"> <LineChart /> </div>
          </div>
          <div className="card mb-4 box-shadow">
            <div className="card-header"> <h4 className="lead my-1">Realtime S&#38;P-500 chart</h4> </div>
            <div className="card-body" id="spycol"> <TradingViewWidget /> </div>
          </div>
          </div>
      </div>

      <main role="main" className="container"id="textbox">
        <div className="row gx-5 px-5">
          <div className="col blog-main mx-2 px-5">
            <h2 className="pb-3 pt-3 mb-4 border-bottom"> Algo Trading Visualizer</h2>
            <div className="blog-post" id="htmldata">
                <p className="blog-post-meta"> April 15, 2024 by <a href="https://www.linkedin.com/in/sumy-ganas-201a89308/" rel="noreferrer" target="_blank">Sumy</a> </p>
                <HtmlData />
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

export default TradingApp;
