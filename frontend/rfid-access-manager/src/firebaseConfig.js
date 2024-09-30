// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBVOXTqTcj2HM8uKrHBB1xtJXdaekeX_oY",
    authDomain: "arduino-b3ea5.firebaseapp.com",
    projectId: "arduino-b3ea5",
    storageBucket: "arduino-b3ea5.appspot.com",
    messagingSenderId: "327716188650",
    appId: "1:327716188650:web:99ead0df4cf32dcd484293"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
