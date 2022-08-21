const ezio = require("../events");
const GM = "it sends good morning message";
const GN = "it sends Night message";

ezio.addCommand(
  { pattern: [], on: 'text', desc: GM, dontAddCommandList: true, category: ["chat", "all"] },
  async (message, client) => {
    try {
      if (message.isGroup) return;
      if (message.fromMe) return;
      let text = ezio.config.lib.eziofunc.chatBot(message.client.displayText);
      await client.sendMessage( message.from, { text }, { quoted: message });
    } catch (error) {
      global.catchError = true;
      return await client.sendErrorMessage( message.from, error, message.key, message );
    }
    global.catchError = false;
  }
);
