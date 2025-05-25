# 🤖 Chat Gemini com Busca no Google (SerpAPI) — Projeto React + Node.js

Este projeto é uma aplicação de chat que usa o modelo de linguagem **Gemini (Google)** com suporte a busca no Google via **SerpAPI**, e foi desenvolvido utilizando **React + Vite no frontend** e **Express (Node.js) no backend**.

> O objetivo é oferecer um chatbot com memória de conversa, respostas mais humanas e atualizações em tempo real por meio de pesquisas na web.

---

## 📁 Estrutura do Projeto

```
chat-gemini-app/
├── frontend/   # Aplicativo React com Vite
└── backend/    # Servidor Express com proteção de chaves API
```

---

## 🚀 Funcionalidades Implementadas

### ✅ Frontend (React)

* Interface de chat com estilo responsivo
* Markdown nas respostas do bot
* Emojis, ícones e botões personalizados
* Suporte a **modo de busca com SerpAPI** ativado/desativado via checkbox
* Memória de conversa (histórico mantido durante a sessão)
* Estilo de conversa **casual, amigável e explicativo** (via prompt de instrução)

### ✅ Backend (Express)

* Rota `/api/chat` para gerar resposta com o modelo Gemini
* Rota `/api/search` para buscar resultados no Google com SerpAPI
* Uso de variáveis de ambiente com `.env`
* Proteção de chaves de API
* Suporte a CORS para integração com frontend local

---

## 🧪 Tecnologias Utilizadas

### Frontend

* React
* Vite
* React Markdown
* React Icons

### Backend

* Node.js
* Express
* node-fetch
* axios (para integração com SerpAPI)
* dotenv

---

## 🗝 Variáveis de Ambiente

No backend, crie um arquivo `.env` com o seguinte:

```env
GEMINI_API_KEY=SUA_CHAVE_DO_GEMINI
SERP_API_KEY=SUA_CHAVE_DA_SERPAPI
```

> As chaves devem ser geradas no [Google AI Studio](https://makersuite.google.com/) e [SerpAPI](https://serpapi.com/).

---

## ▶️ Como Executar Localmente

### 1. Clonar o projeto

```bash
git clone https://github.com/seu-usuario/chat-gemini-app.git
cd chat-gemini-app
```

### 2. Iniciar o Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Iniciar o Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 📝 Personalizações feitas

* Prompt inicial configurado para estilo **casual e conversador**:

```txt
Você é uma IA assistente simpática, curiosa e com tom casual e amigável. Responda como se estivesse batendo papo com o usuário, usando uma linguagem informal e próxima. Evite parecer um robô. Dê exemplos sempre que possível e explique de forma simples.
```

* Alternância de busca via checkbox
* Histórico de conversa mantido em memória temporária

---

## 📌 Próximas melhorias sugeridas

* [ ] Salvar histórico local com `localStorage`
* [ ] Tema escuro/claro
* [ ] Mostrar links reais da busca
* [ ] Exportar conversa em PDF/TXT
* [ ] Publicar frontend (Vercel) e backend (Railway ou Render)
* [ ] Criar personagem/identidade para a IA

---

## 👨‍💻 Autor

**Nelson Caracas** — projeto em desenvolvimento pessoal com apoio do ChatGPT, passo a passo.

Sinta-se à vontade para clonar, testar, melhorar e usar como base para seu próprio app de IA!

---

Feito com muita curiosidade e persistência. 💡
