const HtmlData = () => {
    const data = 
    `
    <style>
    a {
      color: #eb52a1;

    }

    p {
      text-align: justify;
    }

    pre {
      background-color: #34282C;
      color: white;
      padding: 5px 5px 5px 20px;

    }

    </style>

    
    <p>This project is a visualization comparing the performance of a simple RSI and MACD crossover based automated trading strategies to the performance of the S&amp;P500 index over a fixed window using a paper trading API. The way the strategy works is by checking the aforementioned technical indicators of a stock and returning a buy or sell signal based on them.</p>
    
    <p>My strategy only uses American stocks as investment vehicles, which makes a stock index the best benchmark to compare against. I chose the S&P 500 index funds as a comparison because they are among the most popular investment choices in the United States. It also provides a broad view of the economic health of the U.S. because it covers so many companies in so many different sectors. Therefore, a decrease in the index suggests that profitability in the market that day is improbable, and would explain low points in my portflio graph.</p>
    
    <p>MACD and RSI values let you appropriately time an entry into a trade. MACD (Moving Averages Convergence Divergence) reflects a reversal of trends. It has three values: the main value, a signal value and a histogram value. A positive histogram value along with the main value being greater than the signal value predicts the stock price going up. The reverse predicts the stock price going down. The RSI (Relative Strength Index) value is a measure of the stock's volume. An RSI  value of > 70 indicates that the stock has been overbought and is predicted to drop in price. An RSI value of < 30 indicates that the stock has been oversold and predicts a rise.</p>    
    
    <p>My algorithm uses RSI values of 65 and 35 respectively in order to increase the volume of trades placed for demonstration purposes. This makes the algorith much more sensitive to volume fluctations and facilitates more rapid buying and selling. The Indicator data used is EOD data from the previous day which makes this entire strategy a demo version of what a real strategy would look like.</p>

    <p>It uses the Alpaca Paper Trading and Market Trading APIs to facilitate real time order strategy execution.
    Read the <a href="https://docs.alpaca.markets/docs/paper-trading">Alpaca Docs.</a></p>
    
   
    <h6><strong>Technologies used:</strong></h6>
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
    <h2>How it works</h2>
    <hr/>
    <p>The code involves three main classes <code>StrategyHandler()</code> and <code>StrategyExecution()</code>, and <code>WatchlistHandler()</code> which are invoked via Cloud Functions once daily. The strategy involves allocating a set dollar amount every day to fund stock purchases. The code runs for 8 hours every day (i.e. during market open hours)</p>
    <p><strong>The Set-Up Classes:</strong> </br>
    We first create a class that contains methods for order creation and execution, and handling strategy logic. We initialize Alpaca's client directly in the class constructor method so that the instantiation of a strategy handler results in a new</p>
    <pre class="language-python"><code class="language-python">from alpaca.trading.client import TradingClient
    
    class StrategyHandler():
      def __init__(self, client: TradingClient, secret: dict):
        self.trading_client = client
        self.secret = secret
    </code></pre>
    <p>The Strategy Handler is a helper class that contains miscellaneous methods that perform ROI and P/L calculations, calculate the quantity of stock to buy, retrieve technical Indicator data from Polygon.io API, and validate data in the Trading Account in order to determine if the allocation limit has been reached. It also has methods that create an order data object and execute an order based on them.</p>
    <pre><code class="language-python">class StrategyExecution():
      def __init__(self, allocation_limit: float, client: TradingClient, secret: dict):
        self.allocation_limit = allocation_limit
        self.trading_client = client
        self.strategy_handler = StrategyHandler(client, secret)
        self.watchlist_handler = WatchlistHandler(secret)
    </code></pre>
    <p>The Strategy Execution class is used to create one instance or iteration of a buy or sell strategy. It contains methods that essentially entail the buy and sell strategy logic. My program uses the RSI and MACD crossover strategy.</p>
    <p>It takes in the daily cash allocation limit as constructor and its instance also instantiates the two other main classes. In my strategy, I used 0.02 or 2% of my account's net cash position as the daily stock allocation limit. The secret argument is the dictionary of environment variables holding the respective API keys.</p>
    <pre><code class="language-python">class WatchlistHandler():
      def __init__(self, secret):
        self.secret = secret
    </code></pre>
    <p>The watchlist handler contains methods to create and return a daily stock watchlist, which is a list of stocks that the program is set to focus on for the day. I used the FMP API to return the previous day's most active and biggest gainer stocks.</p>
    <h2>The Main Strategy</h2>
    <hr/>
    <p><strong>Buy Strategy:</strong></p>
    <pre><code class="language-python">@sleep_and_retry
    @limits(calls=200, period=61)
    def buy_signal(self, ticker: str, allocation: float, spent_already: float) -> (tuple[str,float]):
        #getting new account details every call to account for changes
        account_details = self.trading_client.get_account()
        cash_available = float(account_details.cash)
        if self.check_if_buy(allocation, spent_already, account_details):
            value, signal, hist = self.get_ta_data(ticker, "macd")
            if value > signal and hist > 0.0:
                rsi = self.get_ta_data(ticker, "rsi")
                if rsi < 35.00:
                    return ("buy", cash_available)
            return ("do nothing", cash_available)
        return ("no funds", cash_available) #no funds remaining
        </code></pre>
    <p>The <code>buy_signal()</code> function is a method from the <code>Strategy_Handler()</code> class that returns either a &quot;buy&quot; signal (the RSI and MACD are indicating a rise in the stock price), a &quot;do nothing&quot;, or &quot;no funds&quot; signal to signify that the allocation limit (<code>spent_already</code>) has been reached which breaks the loop.</p>

    <pre><code class="language-python">def buy_strategy(self) -&gt; (list|None):
      spent_already = 0.0
      #create a new watchlist -&gt; watchlist
      stocklist = self.watchlist_handler.create_watchlist()
      watchlist = self.watchlist_handler.approve_watchlist(stocklist)
      # run operations on new watchlist
      orderlist = []
      for stock in watchlist:
        ticker = stock[&quot;symbol&quot;]
        strat, port_val = self.strategy_handler.buy_signal(ticker, self.allocation_limit, spent_already)
        if strat == &quot;buy&quot;:
          qty = self.strategy_handler.quantity_calc(strat, ticker, port_val)
          if qty is not None:
            print(f&quot;Buying {qty} stocks of {stock}&quot;)
          order_data = self.strategy_handler.create_order_data(stock[&quot;symbol&quot;], qty, &quot;buy&quot;)
          order = self.strategy_handler.execute_order(order_data)
          orderlist.append(order)
          if order.filled_avg_price is not None:
            spent_already += float(order.filled_avg_price)
          else:
            quote = self.strategy_handler.get_quote(ticker)
            unitprice = quote[&quot;quotes&quot;][ticker][&quot;ap&quot;
            spent_already += float(unitprice)*qty
        if strat == &quot;no funds&quot;:
          print(&quot;Finished buying for the day&quot;)
          break
      if spent_already &gt; 0:
        print(f&quot;Amount spent: {spent_already}&quot;)
        return orderlist
      if spent_already == 0:
        print(&quot;No stocks to buy today!&quot;)
        return None
      raise RuntimeError(&quot;Error calculating total amount spent on daily purchases&quot;)
    </code></pre>
    <p>The <code>buy_strategy()</code> function is a method from <code>Strategy_Execution()</code> class that simply iterates on the list of stocks created by the <code>WatchlistHandler()</code> methods. It runs the <code>buy_signal()</code> function to receive a signal. If the daily allocation limit (2&#37; of current portfolio value) hasn't been used up, the buy signal leads it to calculate the quantity of the the stock to be purchased. A &quot;do nothing&quot; signal occurs when the <code>buy_signal()</code> signal did not receive a buy signal from the indicators. It implies that nothing needs to be done for that particular ticker so it can skip it and move on to the next one on the watchlist. It outputs the total amount spent and returns the list of orders places in that iteration.</p></p>
    <p><strong>Sell Strategy:</strong></p>
    <pre><code class="language-python">
    def sell_signal(self, position) -> (str|None):
      value, signal, hist = self.get_ta_data(ticker, "macd")
      if value < signal and hist < 0.0:
        rsi = self.get_ta_data(ticker, "rsi")
        if rsi > 65.00:
          return "sell"
      roi_signal = self.strategy_handler.check_roi(position)
      if roi_signal is True:
        return "sell"
      return None   

    </code></pre>
    <p>The <code>sell_signal()</code> function is a method from the <code>Strategy_Handler()</code> class that iterates over a list of stocks. The sell strategy is quite simple; it checks if the ROI is &gt;=5% or if the MACD and RSI indicators are have the appropriate sell values. If either is true, it returns a "sell" signal.</p>

    <pre><code class="language-python">def sell_strategy(self) -&gt; (list|None):
      try:
        positions = self.trading_client.get_all_positions()
      except requests.HTTPError:
        logger.error(&quot;Error getting position from alpaca client: %s&quot;, requests.HTTPError)
        raise 
      sell_orders = []
      for position in positions:
        sell_signal = self.sell_signal(position)
        if sell_signal == "sell":
          order_data = self.strategy_handler.create_order_data(
            position.symbol, position.qty_available, "sell"
            )
          order = self.strategy_handler.execute_order(order_data)
          sell_orders.append(order)
          print(f"Sell order placed: {order}")
              
      if len(sell_orders) &gt; 0:
        return sell_orders
      return None
    </code></pre>
    <p>The <code>sell_strategy()</code> function is a method from the <code>Strategy_Execution()</code> class that runs an iteration of the sell strategy on the list of currently held positions. It then places a sell order if <code>sell_signal()</code> function returns a "sell" signal.</p>
    
    <p><strong>Strategy Iterations:</strong><br/>
    The strategy runs at market open every day when a Google Cloud Function is invoked by a scheduled Cloud Pub/Sub Event. The Cloud Scheduler send a &quot;buy&quot; Pub/Sub message at market open and a &quot;sell&quot; Pub/Sub message every hour after until market close. This makes it so the stocks are bought once during the day and the current holdings are checked five times daily in order to ensure any small windows of peak ROI are not missed.</p>
   

    `;

return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default HtmlData;


    