# Algotrading Visualizer 
- This project is a visualization comparing the performance of a simple RSI and MACD crossover based automated trading strategies to the S&P500 over a fixed window using paper trading APIs
- It uses the Alpaca Paper Trading and Market Trading APIs to facilitate real time order strategy execution
- Read the Alpaca Docs[here](https://docs.alpaca.markets/docs/paper-trading)
##### **Technologies used:**
###### The Back-end
1. *Database* - Google Cloud Firestore
2. *Serverless strategy execution* - Google Cloud Functions, Cloud Scheduler and Cloud Pub/Sub Events
###### The Front-end
1. *Hosting* - 
2. *Frameworks* - JS React and HTML Bootstrap 
###### APIs
1. [Alpaca - Market data and Paper-trading Python SDK](https://alpaca.markets/sdks/python/)
2. [Polygon.io API](https://polygon.io/docs/stocks/getting-started) 
3. [Financial Modeling Prep API](https://site.financialmodelingprep.com/developer/docs)
##### **How it works**
The code involves three main classes `StrategyHandler()` and `StrategyExecution()`, and `WatchlistHandler()` which are invoked via Cloud Functions once daily. The strategy involves allocating a set dollar amount every day to fund stock purchases. The code runs for 8 hours every day (i.e. during market open hours)

# AiScraper Application

This app is used to stay informed on the daily deals from Ulta and Beaauty Bay. 

It uses Google's Gemini AI to provide insights and simplify shopping:
- Input your personal preferences to figure out what the best products for you
- Decide what particular items you should buy from which company today
- 

It sends a daily email to your google account containing the updated deals and insights from sephora, ulta and macys.
