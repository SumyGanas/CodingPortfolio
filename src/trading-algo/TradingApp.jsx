import '../styles/App.css';
import PortChart from './portchart.jsx';
import LineChart from './linechart.jsx';
import React, { useEffect } from 'react';
import HeaderBar from '../nav/HeaderBar.jsx';
import Prism from 'prismjs';
import 'prismjs/components/prism-python.min.js';
import '../styles/custom-theme.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Image from 'react-bootstrap/Image';
import FooterBar from '../footer/footer.jsx';


const Link = ({ id, children, title }) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <span className='tooltiplinkdecor'>{children}</span>
  </OverlayTrigger>
);

const TradingApp = () => {
  useEffect(() => {
    Prism.highlightAll();
}, []);

const ChartTabs = () => {
  return (
    <Tab.Container id="chartTabs" defaultActiveKey="spyvsbot" transition={false}>
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item id="chartTab">
              <Nav.Link eventKey="spyvsbot" >Spy vs Bot (Last 30 days)</Nav.Link>
            </Nav.Item>
            <Nav.Item id="chartTab">
              <Nav.Link eventKey="portfolio" >Portfolio (All time)</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col lg={9}>
          <Tab.Content>
            <Tab.Pane eventKey="spyvsbot">
            <PortChart />
            </Tab.Pane>
            <Tab.Pane eventKey="portfolio">
            <LineChart />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

const codeSnippet1 = `from alpaca.trading.client import TradingClient
    
class StrategyHandler():
    def __init__(self, client: TradingClient, secret: dict):
        self.trading_client = client
        self.secret = secret`;
  
const codeSnippet2 = `class StrategyExecution():
    def __init__(self, allocation_limit: float, client: TradingClient, secret: dict):
        self.allocation_limit = allocation_limit
        self.trading_client = client
        self.strategy_handler = StrategyHandler(client, secret)
        self.watchlist_handler = WatchlistHandler(secret)
`;

const codeSnippet3 = `class WatchlistHandler():
    def __init__(self, secret):
        self.secret = secret
`;

const codeSnippet4 = `@sleep_and_retry
@limits(calls=200, period=61)
def buy_signal(self, ticker: str, allocation: float, total_expenditure: float) -> (tuple[bool,float]):
    # Getting new account details on every strategy iteration to account for changes
    account_details = self.trading_client.get_account()
    cash_available = float(account_details.cash)
    
    # Checking if there are funds available and for a buy signal
    if self.check_if_buy(allocation, total_expenditure, account_details):
        value, signal, hist = self.get_ta_data(ticker, "macd")
        if value > signal and hist > 0.0:
            rsi = self.get_ta_data(ticker, "rsi")
            if rsi < 35.00:
                return (True, cash_available)
        return (False, cash_available)
    
    #no funds remaining will terminate further iterations
    return (None, cash_available) 
    `;

const codeSnippet5 = `def buy_strategy(self) ->; (list|None):
    # Tracking how much money is spent in one iteration
    total_expenditure = 0.0
    # Create a new watchlist
    stocklist = self.watchlist_handler.create_watchlist()
    watchlist = self.watchlist_handler.approve_watchlist(stocklist)
    # run operations on new watchlist
    orderlist = []
    for stock in watchlist:
        ticker = stock["symbol"]
        buy_signal, port_val = self.strategy_handler.buy_signal(
          ticker, self.allocation_limit, total_expenditure
          )
        if buy_signal == True:
          # Determine how much stock to buy
          qty = self.strategy_handler.quantity_calc(strat, ticker, port_val)
          # Create order
          order_data = self.strategy_handler.create_order_data(stock["symbol"], qty, "buy")
          order = self.strategy_handler.execute_order(order_data)
          orderlist.append(order)
            # Determine price to fill order
            if order.filled_avg_price:
              total_expenditure += float(order.filled_avg_price)
            else:
              quote = self.strategy_handler.get_quote(ticker)
              unitprice = quote["quotes"][ticker]["ap"]
              total_expenditure += float(unitprice)*qty
        #Terminating strategy if no funds available
        elif buy_signal == None:
          break
    if total_expenditure > 0:
      return orderlist
    if total_expenditure == 0:
      return None
    raise RuntimeError("Error calculating total amount spent on daily purchases")`;

const codeSnippet6 = `def sell_signal(self, position) -> (bool):
    value, signal, hist = self.get_ta_data(ticker, "macd")
    if value < signal and hist < 0.0:
      rsi = self.get_ta_data(ticker, "rsi")
      if rsi > 65.00:
        return True
    # Checking to make sure the trade's ROI isn't very unprofitable
    roi_signal = self.strategy_handler.check_roi(position)
    return roi_signal`;

const codeSnippet7 = `def sell_strategy(self) ->; (list|None):
    # Get all currently held positions
    try:
      positions = self.trading_client.get_all_positions()
    except requests.HTTPError:
      logger.error("Error getting position from alpaca client: %s", requests.HTTPError)
      raise 
    # List to hold all acceptable sell orders  
    sell_orders = []
    # Checking each position for a sell signal
    for position in positions:
      sell_signal = self.sell_signal(position)
      if sell_signal:
          # Create sell order
        order_data = self.strategy_handler.create_order_data(
          position.symbol, position.qty_available, "sell"
          )
        order = self.strategy_handler.execute_order(order_data)
        sell_orders.append(order)
    # No sell orders are placed if there isn't any position with a sell signal
    if len(sell_orders) > 0:
      return sell_orders
    return None`;

return (
  <>
      <div className="container" id="nav-bar">
        <HeaderBar />
      </div>
      
      <div className="container sura-regular" id="headerbox">
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

      <div className="container my-3 py-2 sura-regular" id="chartbox" >
        <div className="card-deck mt-3 mb-3 gx-5 px-5 text-center">

          <div className="card mb-2 ms-auto box-shadow" id="chart">
          
            <div className="card-header"> <h4 className="lead my-1">Interactive Portfolio Charts</h4> </div>
            <div className="card-body"> 
            <ChartTabs />
            </div>
          </div>
          </div>
      </div>

      <main role="main" className="container sura-regular"id="textbox">
        <div className="row gx-5 px-5">
          <div className="col blog-main mx-2 px-5">
            <h1 className="pb-3 pt-3 mb-4 border-bottom"> Algo Trading Visualizer</h1>
            <p className="blog-post-meta"> April 15, 2024 by <a href="https://www.linkedin.com/in/sumy-ganas-201a89308/" rel="noreferrer" target="_blank">Sumy</a> </p>
              <h2>Introduction</h2>
    <hr/> 
    <p>This visualization compares the performance of automated <Link title="A number between 0 and 100 that shows how fast a stock's price is rising or falling. A high number (above 70) can mean the stock has gone up too fast and might drop soon. A low number (below 30) can mean it has dropped too much and might go back up" id="t-1"> RSI</Link> and <Link title="A tool that helps spot changes in a stock’s trend. It compares two moving averages of the stock’s price. When the lines cross, it can be a signal to buy or sell. It's used to tell if a stock might start going up or down." id="t-1"> MACD</Link> crossover trading strategies to the performance of the S&amp;P500 index over a fixed window using a paper trading API. The strategy involves evaluating the RSI and MACD values of a stock ticker and returning a corresponding buy or sell signal.</p>
    
    <p>The algorithm only evaluates stocks listed on the NYSE,thus making a comprehensive stock index like the S&P 500 index fund (SPY) the best benchmark to compare against. SPY provides a broad view of the economic health of the U.S. because it covers so many companies in so many different sectors. A decrease in the index suggests market profitability is low&#8212; explaining adjacent low points in the portflio graph.</p> 

    <p>One of the biggest limitations of using paper trading APIs is that they don't account for complex market events such as stock spilts and reverse splits. Unfortunately, the only ways to prevent this are to use a live trading account or manually adjust share prices for each trade. A random, sudden surge or drop in portfolio value from a drastic change in stock price is usually a strong indicator that that API failed to adjust share price following a (reverse) split.</p>

    <h2>Software Architecture Diagram</h2>
    <hr/>
    <div className="blog-post language-python" id="htmldata">
    <Image src="/tradingbot-diagram.png" fluid rounded className="mt-3 mb-4" alt="Software Architecture Diagram"/>

    <h2>How it works:</h2>
    <hr/> 

    <h6><p><strong>The Encoded Trading Strategy</strong></p></h6>

    <p>MACD (Moving Averages Convergence Divergence) and RSI (Relative Strength Index) indicators function as signals that let you appropriately time an entry into and an exit out of a trade.</p> 
    
    <ol>
    <li><p>MACD  reflects a reversal of trends. It has three values: the main value, a signal value and a histogram value. A positive histogram value along with the main value being greater than the signal value predicts the stock price going up. The reverse predicts the stock price going down.</p></li>
    
   <li><p>The RSI value is a measure of the stock's volume. An RSI  value of &gt; 70 indicates that the stock has been overbought and is predicted to drop in price. An RSI value of &lt; 30 indicates that the stock has been oversold and predicts a rise.</p></li>
  </ol>

  <p>The buy and sell signals occur when both the MACD and RSI indicator values reach their designated ranges. The Indicator data used is EOD data from the previous day, making it a demo version of a strategy that uses real-time data.</p>

    <p>The Cloud Run Function on the GCP server uses the Alpaca Paper Trading and Market Trading APIs to facilitate real time order execution.
    Read the Alpaca Docs <a href="https://docs.alpaca.markets/docs/paper-trading">here.</a></p>
    
   
    <h6><strong>Specs:</strong></h6>
    <h6>The Back-end</h6>
    <ul>
    <li>
    Database - Google Cloud Firestore</li>
    <li>
    Serverless functions (strategy execution) - Google Cloud Functions, Cloud Scheduler, Cloud Pub/Sub Events</li>
    </ul>
    <h6>The Front-end</h6>
    <ul>
    <li>
    Hosting -</li>
    <li>
    Frameworks - React, Bootstrap for React, ReactRouter</li>
    </ul>
    <h6>APIs</h6>
    <ul>
    <li>
    <a href="https://alpaca.markets/sdks/python/">Alpaca - Market data and Paper-trading Python SDK</a>
    </li>
    <li>
    <a href="https://polygon.io/docs/stocks/getting-started">Polygon.io API</a>
    </li>
    <li>
    <a href="https://site.financialmodelingprep.com/developer/docs">Financial Modeling Prep API</a>
    </li>
    </ul>

    <p>The code involves three main classes <code>StrategyHandler()</code> and <code>StrategyExecution()</code>, and <code>WatchlistHandler()</code> which are invoked via Cloud Functions once daily. The strategy involves allocating a set dollar amount every day to fund stock purchases. The code runs for 8 hours every day (i.e. during market open hours)</p>
    
    <p><strong>The Set-Up Classes:</strong> <br />
    We first create a class that contains methods for order creation and execution, and handling strategy logic. We initialize Alpaca's client directly in the class constructor method so that the instantiation of a strategy handler results in a new</p>
    
    <pre><code>{codeSnippet1}</code></pre>
    
    <p>The Strategy Handler is a helper class that contains miscellaneous methods that perform ROI and P/L calculations, calculate the quantity of stock to buy, retrieve technical Indicator data from Polygon.io API, and validate data in the Trading Account in order to determine if the allocation limit has been reached. It also has methods that create an order data object and execute an order based on them.</p>
    
    <pre><code>{codeSnippet2}</code></pre>
    
    <p>The Strategy Execution class is used to create one instance or iteration of a buy or sell strategy. It contains methods that essentially entail the buy and sell strategy logic. My program uses the RSI and MACD crossover strategy.</p>
    <p>It takes in the daily cash allocation limit as constructor and its instance also instantiates the two other main classes. The algorithm uses 0.02 or 2% of the account's net cash position as the daily stock allocation limit. The secret argument is the dictionary of environment variables holding the respective API keys.</p>
    
    <pre><code>{codeSnippet3}</code></pre>
    
    <p>The watchlist handler contains methods to create and return a daily stock watchlist, which is a list of stocks that the program is set to focus on for the day. The FMP API was used to return the previous day's most active and biggest gainer stocks.</p>
    
    <h2>The Main Strategy</h2>
    <hr/>
    
    <p>The algorithm uses RSI values of 65 and 35 instead of the usual 70 and 30. This makes the algorith much more sensitive to volume fluctations and facilitates more rapid buying and selling.</p>
    
    <h5>Buy Strategy:</h5>
    
    <pre><code>{codeSnippet4}</code></pre>
    
    <p>The <code>buy_signal()</code> function is a method from the <code>Strategy_Handler()</code> class that returns either a &quot;buy (True)&quot; signal (the RSI and MACD are indicating a rise in the stock price), a &quot;do nothing (False)&quot;, or &quot;no funds (None)&quot; signal to signify that the allocation limit (<code>total_expenditure</code>) has been reached which breaks the loop.</p>

    <pre><code>{codeSnippet5}</code></pre>
    
    <p>The <code>buy_strategy()</code> function is a method from <code>Strategy_Execution()</code> class that simply iterates on the list of stocks created by the <code>WatchlistHandler()</code> methods. It runs the <code>buy_signal()</code> function to receive a signal. If the daily allocation limit (2&#37; of current portfolio value) hasn't been used up, the buy signal leads it to calculate the quantity of the the stock to be purchased. A &quot;do nothing&quot; signal occurs when the <code>buy_signal()</code> signal did not receive a buy signal from the indicators. It implies that nothing needs to be done for that particular ticker so it can skip it and move on to the next one on the watchlist. It outputs the total amount spent and returns the list of orders places in that iteration.</p>
    
    <h5>Sell Strategy:</h5>
    
    <pre><code>{codeSnippet6}</code></pre>
    <p>The <code>sell_signal()</code> function is a method from the <code>Strategy_Handler()</code> class that iterates over a list of stocks. The sell strategy is quite simple; it checks if the ROI is &gt;=5% or if the MACD and RSI indicators are have the appropriate sell values. If either is true, it returns a "sell" signal.</p>

    <pre><code>{codeSnippet7}</code></pre>
    
    <p>The <code>sell_strategy()</code> function is a method from the <code>Strategy_Execution()</code> class that checks for a sell signal on the list of currently held positions and places a sell order for all the positions that return a sell signal.</p>
    
    <h5>Strategy Iterations:</h5>
    <p>The strategy runs at market open every day when a Google Cloud Function is invoked by a scheduled Cloud Pub/Sub Event. The Cloud Scheduler send a &quot;buy&quot; Pub/Sub message at market open and a &quot;sell&quot; Pub/Sub message every hour after until market close. This makes it so the stocks are bought once during the day and the current holdings are checked five times daily in order to ensure any small windows of peak ROI are not missed.</p><br /><br />
            </div>
          </div>
          </div>
      </main>
      <a href="#nav-bar" style={{display : 'block', padding : '12px', textAlign : "center"}}>Back to top</a>
      <br/> <br/>  <br/>  <br/>
      <FooterBar />
  </>
);}

export default TradingApp;
