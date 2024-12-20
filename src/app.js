import express from 'express';
import defaultRoutes from '../src/routes/route.js'

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', defaultRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});