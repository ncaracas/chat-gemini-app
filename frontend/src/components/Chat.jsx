import { useEffect, useRef, useState } from "react";
import { FaUser, FaRobot, FaTrashAlt, FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import "./Chat.css";

function Chat() {
  const [mensagem, setMensagem] = useState("");
  const [respostas, setRespostas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [usarBusca, setUsarBusca] = useState(true);
  const chatBoxRef = useRef(null);

  // Instrução para definir o estilo da IA  
  const introducao = {
    role: "user",
    parts: [
      {
        text: `Você é uma IA assistente simpática, curiosa e com tom casual e amigável. 
        Responda como se estivesse batendo papo com o usuário, usando uma linguagem informal e próxima. 
        Evite parecer um robô. Dê exemplos sempre que possível e explique de forma simples.`,
      },
    ],
  };

  const montarHistorico = () => {    
    return respostas.map((item) => ({
      role: item.tipo === "user" ? "user" : "model",
      parts: [{ text: item.texto }],
    }));
  };

  const enviarPergunta = async () => {
    if (!mensagem.trim()) return;

    const perguntaAtual = mensagem;
    setMensagem("");
    setCarregando(true);

    // adiciona pergunta do usuário localmente no estado
    setRespostas((prev) => [...prev, { tipo: "user", texto: perguntaAtual }]);

    try {
      // 1. Buscar no Google com a SerpAPI se ativado
      let contextoGoogle = "";
      if (usarBusca) {
        const busca = await fetch("http://localhost:3001/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: perguntaAtual }),
        });
        const resultado = await busca.json();
        contextoGoogle = resultado?.resumo || "";
      }

      // 2. Montar histórico completo incluindo instrução e conversas anteriores
      const historicoCompleto = [introducao, ...montarHistorico()];

      // 3. Adicionar nova pergunta, com contexto da web se houver
      const textoComContexto = contextoGoogle
        ? `Aqui estão alguns resultados da web:\n\n${contextoGoogle}\n\nCom base nisso, responda:\n${perguntaAtual}`
        : perguntaAtual;
      historicoCompleto.push({ role: "user", parts: [{ text: textoComContexto }] });   

      // 4. Enviar histórico ao backend para consulta ao Gemini
      const respostaAPI = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: historicoCompleto }),
      });

      const dados = await respostaAPI.json();
      
      const textoResposta =
        dados?.candidates?.[0]?.content?.parts?.[0]?.text || "Não entendi a resposta.";

      // 5. Adiciona resposta do bot
      setRespostas((prev) => [...prev, { tipo: "bot", texto: textoResposta }]);
    } catch (error) {
      setRespostas((prev) => [
        ...prev,
        { tipo: "bot", texto: "Erro ao buscar resposta da IA." },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  const limparChat = () => {
    setRespostas([]);
    setMensagem("");
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [respostas]);

  return (
    <div className="chat-container">
      <h2>Gemini AI Responde!</h2>
      <div className="chat-box" ref={chatBoxRef}>
        {respostas.map((res, index) => (
          <div key={index} className={`mensagem ${res.tipo}`}>
            {res.tipo === "user" ? <FaUser className="icone" /> : <FaRobot className="icone" />}
            <div className="resposta">
              <ReactMarkdown>{res.texto}</ReactMarkdown>
            </div>
          </div>
        ))}
        {carregando && <div className="mensagem bot">Digitando...</div>}
      </div>

      <label style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <input
          type="checkbox"
          checked={usarBusca}
          onChange={() => setUsarBusca(!usarBusca)}
          style={{ marginRight: 8 }}
        />
        Usar busca no Google (SerpAPI)
      </label>  

      <textarea
        rows={4}
        className="input-area"
        placeholder="Digite sua pergunta..."
        id="input-area"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      ></textarea>

      <div className="botoes">
        <button onClick={enviarPergunta} disabled={carregando}>
          <FaPaperPlane style={{ marginRight: 8 }} /> Enviar
        </button>
        <button onClick={limparChat} className="limpar">
          <FaTrashAlt style={{ marginRight: 8 }} /> Limpar
        </button>
      </div>
    </div>
  );
}

export default Chat;
