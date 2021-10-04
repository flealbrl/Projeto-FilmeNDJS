const express = require('express');
const cors = require('cors');
const app = express();
const port = 5500;

app.use(express.json())

app.use(cors());

const VagasRouter = require('./routers/vagas.routes');

app.use('/vagas', VagasRouter);


app.get('/', (req, res) => {
  res.send('olá bluemers');
})

app.listen(port, () => {
  console.log(`Aplicação está rodando em http://localhost:${port}/`);
})