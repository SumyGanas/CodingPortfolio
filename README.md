# Coding Portfolio
This repository holds the front end code for my web apps that are a part of my coding portfolio.

## Algotrading Visualizer 
This project is a visualization comparing the performance of a simple RSI and MACD crossover based automated trading strategies to the S&P500 over a fixed window using paper trading APIs
- Uses the [Alpaca Paper Trading and Market Trading APIs]((https://docs.alpaca.markets/docs/paper-trading)) to facilitate real time order strategy execution
##### **Technologies used:**
###### The Back-end
1. *Database* - Google Cloud Firestore
2. *Serverless strategy execution* - Google Cloud Run Functions, Github actions/workflows, Cloud Scheduler and Pub/Sub Events
###### The Front-end
1. *Hosting* - Firebase Auth/Hosting
2. *Frameworks* - React and Vite
###### APIs
1. [Alpaca - Market data and Paper-trading Python SDK](https://alpaca.markets/sdks/python/)
2. [Polygon.io API](https://polygon.io/docs/stocks/getting-started) 
3. [Financial Modeling Prep API](https://site.financialmodelingprep.com/developer/docs)

## AiScraper Application: Your Personalized Gateway to Ulta Beauty's Best Deals
This app is used to stay informed on the daily deals from Ulta Beauty. It brings the best of Ulta's offers directly to you, tailored to your unique needs and preferences.It uses Google's Gemini AI to provide insights and simplify shopping:
- Input your personal preferences to figure out what the best products for you
- Decide what particular items you should buy from which company today
- Find the best deals offered every day
##### **Technologies used:**
###### The Back-end
1. *Database* - Google Cloud Firestore
2. *Serverless strategy execution* - Cloud Functions for Firebase SDK, Github actions/workflows
###### The Front-end
1. *Hosting* - Firebase Auth/Hosting
2. *Frameworks* - React and Vite
###### APIs
1. Google Cloud Gemini API
