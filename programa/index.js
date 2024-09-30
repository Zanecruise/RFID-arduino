const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializa Firebase Admin SDK
const serviceAccount = require('.firebase-adminsdk.json'); // Baixe seu arquivo de credenciais do Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://seu-projeto.firebaseio.com'
});

const app = express();
app.use(cors());

// Função para validar a tag RFID
app.get('/validate', async (req, res) => {
  const tag = req.query.tag;

  if (!tag) {
    return res.status(400).send('Tag não fornecida');
  }

  // Verifica se a tag existe no Firestore
  const db = admin.firestore();
  const tagRef = db.collection('tags').doc(tag);
  const doc = await tagRef.get();

  if (doc.exists) {
    // Tag válida
    await db.collection('logs').add({
      tag: tag,
      valid: true,
      timestamp: new Date(),
    });
    res.send('Acesso Permitido');
  } else {
    // Tag inválida
    await db.collection('logs').add({
      tag: tag,
      valid: false,
      timestamp: new Date(),
    });
    res.send('Acesso Negado');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
