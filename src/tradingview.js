// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
            "autosize": true,
            "symbol": "OANDA:SPX500USD",
            "interval": "D",
            "timezone": "America/New_York",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "allow_symbol_change": false,
            "backgroundColor": "rgba(185, 197, 208, 0.2)",
            "gridColor": "rgba(64, 41, 53, 0.1)",
            "hide_top_toolbar": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%"}}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noreferrer noopener nofollow" target="_blank"><span className="blue-text">Interactive chart from TradingView.com</span></a></div>
    </div>
  );
}

export default memo(TradingViewWidget);
