import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyB3eCMs6BjwxBzKcx7dBL0DLjGihkUfxFg",
  authDomain: "evernote-app-a4730.firebaseapp.com",
  databaseURL: "https://evernote-app-a4730.firebaseio.com",
  projectId: "evernote-app-a4730",
  storageBucket: "evernote-app-a4730.appspot.com",
  messagingSenderId: "754098700641",
  appId: "1:754098700641:web:4e00c59a44a0a36318c520",
  measurementId: "G-C71ZX1RKYX"
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
