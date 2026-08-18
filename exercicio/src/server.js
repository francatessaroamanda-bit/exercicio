const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarBanco = require("./config/database");

const clienteRoutes = require("./routes/clienteRoutes");
const petRoutes = require("./routes/petRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const servicoRoutes = require("./routes/servicoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clientes", clienteRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/agendamentos", agendamentoRoutes);
app.use("/api/servico", servicoRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Mundo Pet funcionando!"
  });
});

const PORT = process.env.PORT || 5000;

async function iniciarServidor() {
  try {
    await conectarBanco();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("Não foi possível iniciar o servidor.");
  }
}

iniciarServidor();