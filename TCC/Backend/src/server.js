const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarBanco = require("./config/database");

const clienteRoutes = require("./routes/clienteRoutes");
const petRoutes = require("./routes/petRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");

const app = express();

app.use(cors());

app.use(express.json());

conectarBanco();

app.use("/api/clientes", clienteRoutes);

app.use("/api/pets", petRoutes);

app.use("/api/agendamentos", agendamentoRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Mundo Pet funcionando!"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});