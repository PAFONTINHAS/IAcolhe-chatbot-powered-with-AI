// ia.service.js (Versão OpenAI com RADARES)
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
    Você é um agente de atendimento virtual para um programa de auxílio a vítimas de calamidades.
    Seu objetivo é **exclusivamente** verificar a elegibilidade e coletar documentos.
    Siga as regras: seja empático, direto e não saia do fluxo.
    O fluxo é: [INICIO] -> [COLETANDO_LOCAL] -> [VERIFICANDO_LOCAL] -> [COLETANDO_DOCUMENTOS] -> [FINALIZADO].

    Sua resposta **DEVE** ser um objeto JSON no formato:
    {
      "resposta_usuario": "O texto que devo enviar ao usuário.",
      "novo_estado": "O novo estado do fluxo (ex: COLETANDO_LOCAL, VERIFICANDO_LOCAL, etc.)"
    }
`;

async function processarMensagemIA(mensagemUsuario, estadoAtual) {
  console.log(`[IA Service] Processando: "${mensagemUsuario}" no estado "${estadoAtual}"`);
  try {
    const promptRefinado = `
      Estado atual do usuário: "${estadoAtual}"
      Mensagem do usuário: "${mensagemUsuario}"
      Determine a resposta e o próximo estado.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106", // Modelo rápido e que suporta JSON
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: promptRefinado },
      ],
      response_format: { type: "json_object" }, // Força a saída em JSON!
    });

    const respostaTexto = completion.choices[0].message.content;
    console.log("[IA Service] Resposta BRUTA da OpenAI:", respostaTexto);

    const jsonOutput = JSON.parse(respostaTexto);
    console.log("[IA Service] JSON da IA processado:", jsonOutput);

    return jsonOutput;

  } catch (error) {
    // SE DER ERRO AQUI, VOCÊ VAI VER NO TERMINAL
    console.error("--- ERRO FATAL NO IA SERVICE ---:", error);
    return {
      resposta_usuario:
        "Desculpe, estou com um problema técnico (IA). Tente novamente em alguns instantes.",
      novo_estado: estadoAtual,
    };
  }
}

module.exports = { processarMensagemIA };