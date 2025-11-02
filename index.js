// index.js (VERSÃO DEBUG FINAL - ANTI-CRASH)
const express = require("express");
const { urlencoded } = require("body-parser");
const twilio = require("twilio");
const { processarMensagemIA } = require("./ia.service.js"); // Importa nosso serviço de IA
require("dotenv").config(); // Carrega o .env

const app = express();
app.use(urlencoded({ extended: false }));

// --- Nosso "Banco de Dados" em Memória ---
const userStates = new Map();

function getEstadoUsuario(numeroUsuario) {
  return userStates.get(numeroUsuario) || "INICIO";
}

function setEstadoUsuario(numeroUsuario, novoEstado) {
  userStates.set(numeroUsuario, novoEstado);
}
// ----------------------------------------

app.post("/webhook-whatsapp", async (req, res) => {
  const userText = req.body.Body || '';

  const resposta = "Olá! Seja bem vindo ao novo serviço de concessao de solicitações de apoio sobre desastres naturais";

  // ESSA LINHA É NOVA
  console.log("\n--- [WEBHOOK] NOVO PEDIDO RECEBIDO ---");
  const twiml = new twilio.twiml.MessagingResponse();

  twiml.response(resposta);

  res.status(200).type('text/xml').send(twiml.toString());
//   // ESTE 'TRY' GIGANTE É O MAIS IMPORTANTE
//   try {
//     const mensagemRecebida = req.body.Body || "";
//     const numeroUsuario = req.body.From;
//     const midiaUrl = req.body.MediaUrl0;

//     // ESSA LINHA É NOVA
//     console.log(`[WEBHOOK] De: ${numeroUsuario}, Msg: "${mensagemRecebida}"`);

//     // 1. Busca o estado atual do usuário
//     let estadoAtual = getEstadoUsuario(numeroUsuario);
//     console.log(`[WEBHOOK] Estado ATUAL: ${estadoAtual}`);

//     // 2. Lógica de Mídia (FOTOS)
//     if (midiaUrl) {
//       console.log(`[WEBHOOK] Usuário enviou uma IMAGEM (URL: ${midiaUrl})`);
//       // ATUALIZADO para o fluxo de FRENTE/VERSO
//       if (estadoAtual === "COLETANDO_DOC_FRENTE") {
//         twiml.message("Recebi a frente. Ótimo! Agora, por favor, envie o **VERSO** do documento.");
//         setEstadoUsuario(numeroUsuario, "COLETANDO_DOC_VERSO"); 
//         res.type("text/xml").send(twiml.toString());
//         console.log("[WEBHOOK] Resposta enviada: (Recebi FRENTE, pedindo VERSO)");
//         return; 
//       }
//       if (estadoAtual === "COLETANDO_DOC_VERSO") {
//         twiml.message("Recebi o verso. Documentação completa! Estamos processando sua solicitação.");
//         setEstadoUsuario(numeroUsuario, "FINALIZADO"); 
//         res.type("text/xml").send(twiml.toString());
//         console.log("[WEBHOOK] Resposta enviada: (Recebi VERSO, finalizando)");
//         return;
//       }
//     }

//     // 3. Processa a mensagem de TEXTO pela IA
//     console.log("[WEBHOOK] Chamando a IA...");
//     const resultadoIA = await processarMensagemIA(mensagemRecebida, estadoAtual);
//     console.log("[WEBHOOK] IA Respondeu:", JSON.stringify(resultadoIA));


//     // 4. Lógica de Negócio
//     let respostaFinal = resultadoIA.resposta_usuario;
//     let proximoEstado = resultadoIA.novo_estado;

//     if (proximoEstado === "VERIFICANDO_LOCAL") {
//       console.log("[WEBHOOK] LÓGICA: Entrando na verificação de local.");
//       const localInformado = mensagemRecebida;
//       const locaisAprovados = ["porto alegre", "90010-000", "canoas", "teste"]; // Adicionei 'teste'

//       const isAprovado = locaisAprovados.some((local) =>
//         localInformado.toLowerCase().includes(local)
//       );
//       console.log(`[WEBHOOK] LÓGICA: Local "${localInformado}" é Aprovado? ${isAprovado}`);

//       if (isAprovado) {
//         // ATUALIZADO para o fluxo FRENTE/VERSO
//         respostaFinal =
//           "Verificamos que sua região está em estado de calamidade. Você está apto! Por favor, envie uma foto da **FRENTE** do seu RG ou CNH.";
//         proximoEstado = "COLETANDO_DOC_FRENTE";
//       } else {
//         respostaFinal =
//           "Verifiquei seu local, mas infelizmente sua região não está na lista de calamidade atual. Não poderemos seguir com o auxílio.";
//         proximoEstado = "FINALIZADO";
//       }
//     }

//     // 5. Salva o novo estado do usuário
//     console.log(`[WEBHOOK] LÓGICA: Salvando NOVO estado: ${proximoEstado}`);
//     setEstadoUsuario(numeroUsuario, proximoEstado);

//     // 6. Responde ao usuário via Twilio
//     console.log(`[WEBHOOK] Enviando resposta para o usuário: "${respostaFinal}"`);
//     twiml.message(respostaFinal);
//     res.type("text/xml").send(twiml.toString());

//   } catch (error) {
//     // SE ALGO QUEBRAR, VAI APARECER AQUI AGORA
//     console.error("--- ERRO FATAL NO WEBHOOK (index.js) ---:", error);
    
//     // Responde à Twilio com um erro (para não ficar silencioso)
//     twiml.message("Ocorreu um erro interno no nosso servidor. Por favor, tente novamente em alguns segundos.");
//     res.type("text/xml").send(twiml.toString());
//   }


// });

// app.listen(process.env.PORT || 3000, () => {
//   console.log("Servidor rodando na porta 3000! (Versão DEBUG ATIVA)");
});