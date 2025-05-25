// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post("/api/chat", async (req, res) => {
  const { contents } = req.body; 

  try {
    const resposta = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const dados = await resposta.json();    

    res.json(dados);
  } catch (err) {
    console.error("Erro ao chamar Gemini:", err);
    res.status(500).json({ error: "Erro interno" });
  }
});

app.post("/api/search", async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: query,
        api_key: process.env.SERP_API_KEY,
        num: 3,
      },
    });

    const resultados = response.data.organic_results || [];

    const resumo = resultados
      .map((item, i) => `${i + 1}. ${item.title}\n${item.snippet}\n${item.link}`)
      .join("\n\n");

    res.json({ resumo });
  } catch (err) {
    console.error("❌ Erro na busca SerpAPI:", err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao buscar no Google" });
  }
});

app.listen(PORT, () => {    
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
