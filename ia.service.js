// ia.service.js (Versão MOCK - Cérebro Falso)

// Esta função FINGE ser uma IA.
// Ela não tem NENHUMA chamada externa (OpenAI, etc). É instantânea.
async function processarMensagemIA(mensagemUsuario, estadoAtual) {
  
  // Simula uma pequena demora só para parecer real (10ms)
  await new Promise(resolve => setTimeout(resolve, 10));

  // --- ESTE É O NOSSO "CÉREBRO" FALSO ---

  // 1. O usuário está começando
  if (estadoAtual === "INICIO") {
    return {
      resposta_usuario: "Olá! Este é o assistente de calamidades. Para verificar sua elegibilidade, por favor, nos informe sua cidade e estado ou CEP.",
      novo_estado: "COLETANDO_LOCAL"
    };
  }

  // 2. O usuário está enviando o local
  if (estadoAtual === "COLETANDO_LOCAL") {
    // A lógica de *validar* o local está no index.js
    // Aqui só precisamos "empurrar" para a verificação.
    return {
      resposta_usuario: `Entendido, verificando o local: ${mensagemUsuario}...`,
      novo_estado: "VERIFICANDO_LOCAL" // Isso vai ativar o if no index.js!
    };
  }

  // 3. O usuário está enviando "sim" para os documentos
  if (estadoAtual === "COLETANDO_DOC_FRENTE" || estadoAtual === "COLETANDO_DOC_VERSO") {
    // Se o usuário digitar texto em vez de mandar foto
    return {
      resposta_usuario: "Por favor, para esta etapa, preciso que você envie uma foto do seu documento, não um texto.",
      novo_estado: estadoAtual // Mantém o estado
    };
  }

  // 4. Qualquer outra coisa
  return {
    resposta_usuario: "Desculpe, não entendi. Para reiniciar, diga 'oi'.",
    novo_estado: "INICIO"
  };
}

// Exporta a função
module.exports = { processarMensagemIA };