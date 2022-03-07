import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import App from "./App";
import { Provider } from "react-redux";
import { Store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.render(
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
