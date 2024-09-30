// src/AccessLogs.js

import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const AccessLogs = ({ userEmail }) => {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLogs = async () => {
    const logsCollection = collection(db, "accessLogs");
    const logsSnapshot = await getDocs(logsCollection);
    const logsList = logsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setLogs(logsList);
  };

  const handleAccessRelease = async () => {
    try {
      await addDoc(collection(db, "accessLogs"), {
        email: userEmail,
        timestamp: new Date().toISOString(),
        status: "Acesso Liberado"
      });
      setMessage("Acesso liberado com sucesso!");
      fetchLogs(); // Atualiza a lista de logs
    } catch (error) {
      setMessage("Erro ao liberar acesso: " + error.message);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Logs de Acesso</h2>
      <button onClick={handleAccessRelease}>Liberar Acesso</button>
      {message && <p>{message}</p>}
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.email} - {log.timestamp} - {log.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessLogs;
