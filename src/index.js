import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

//socket-io imports
// import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client'
let socket = io("http://192.168.1.53:3000");
socket.on('message from server', function(msg){
alert(msg);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);
