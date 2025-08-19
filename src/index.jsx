import React from 'react';
import './styles/index.css';
import TradingApp from './trading-algo/TradingApp.jsx';
import AiAssistant from './ai-app/AiApp.jsx';
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
    {
      path: "*",
      element: <ErrorPage />,
    }
  ]);

  

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={Router} />
)
reportWebVitals(console.log);

