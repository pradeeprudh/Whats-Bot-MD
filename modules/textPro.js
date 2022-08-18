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

const got = require("got");
const ezio = require("../events");
const maker = require("mumaker");
const lang = ezio.getString("webss");
let N_T = "Need Text."
let T_L = "Text is too long."

ezio.addCommand( { pattern: ["tp-blackpink"], dontAddCommandList: true, sucReact: "🖼", category: ['all', 'create'], }, async (message, client) => {
  if (!message.client.args[0]) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage(N_T) }, { quoted: message } ); };
  if (message.client.length >= 12) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage(T_L) }, { quoted: message } ); };
  await maker.textpro('https://textpro.me/create-blackpink-logo-style-online-1001.html', [message.client.text])
  .then( async (data) => { global.catchError = false; return await client.sendMessage( message.from, { image: { url: data }, caption: ezio.config.exif.cap }, { quoted: message }); })
  .catch( async (err) => { global.catchError = true; return await client.sendErrorMessage( message.from, err, message.key, message ); });
});

ezio.addCommand( { pattern: ["tp-cutpaper"], dontAddCommandList: true, sucReact: "🖼", category: ['all', 'create'], }, async (message, client) => {
  if (!message.client.args[0]) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage(N_T) }, { quoted: message } ); };
  if (message.client.length >= 12) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage(T_L) }, { quoted: message } ); };
  await maker.textpro('https://textpro.me/create-art-paper-cut-text-effect-online-1022.html', [message.client.text])
  .then( async (data) => { global.catchError = false; return await client.sendMessage( message.from, { image: { url: data }, caption: ezio.config.exif.cap }, { quoted: message }); })
  .catch( async (err) => { global.catchError = true; return await client.sendErrorMessage( message.from, err, message.key, message ); });
});