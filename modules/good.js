/* ═══════════════════════════════════════════════════════ //
=> If you want to recode, reupload,
=> or copy the codes/script,
=> pls give credit,
=> no credit? i will take action immediately.
==> Copyright (C) 2022 Dark_Ezio.
==> Licensed under the  MIT License;
===> you may not use this file except in compliance with the License.
=> Thank you to Lord Buddha, Family and Myself.
=> Whats Bot - Dark_Ezio.
// ════════════════════════════ */

const ezio = require("../events");
const GM = "it sends good morning message";
const GN = "it sends Night message";

ezio.addCommand(
  { pattern: ["gm"], desc: GM, sucReact: "💖", category: ["chat", "all"] },
  async (message, client) => {
    await client.sendMessage( message.from, { text: ezio.config.great.GM[Math.floor(Math.random() * ezio.config.great.GM.length)] + message.client.pushName }, { quoted: message } );
    global.catchError = false;
  }
);

ezio.addCommand(
  { pattern: ["gn"], desc: GN, sucReact: "💖", category: ["chat", "all"] },
  async (message, client) => {
    await client.sendMessage( message.from, { text: ezio.config.great.GM[Math.floor(Math.random() * ezio.config.great.GM.length)] + message.client.pushName }, { quoted: message, adReply: true } );
    global.catchError = false;
  }
);
