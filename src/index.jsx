import React from 'react';
import './index.css';
import TradingApp from './TradingApp';
import AiAssistant from './AiApp';
import Home from './Home';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./error-page";

const Router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
      path: "/tradingbot",
      element: <TradingApp />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/aiassistant",
      element: <AiAssistant />,
      errorElement: <ErrorPage />,
    },
  ]);

  

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={Router} />
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
