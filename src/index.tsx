import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ModalProvider, LoaderProvider, ItemsProvider } from "./context";
import "./index.css";

ReactDOM.render(
  <Router>
    <ItemsProvider>
      <LoaderProvider>
        <ModalProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ModalProvider>
      </LoaderProvider>
    </ItemsProvider>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
