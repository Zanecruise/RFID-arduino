// src/Login.js

import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AccessLogs from "./AccessLogs"; // Adicione esta linha

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // Estado para verificar se o usuário está logado

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login realizado com sucesso!");
      setLoggedIn(true); // Atualiza o estado para indicar que o usuário está logado
    } catch (error) {
      setMessage("Erro ao realizar login: " + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {message && <p>{message}</p>}
      {loggedIn && <AccessLogs userEmail={email} />} {/* Renderiza AccessLogs após login */}
    </div>
  );
};

export default Login;
