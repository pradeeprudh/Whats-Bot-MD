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

const yts = require("yt-search");
const ezio = require("../events");
const util = require('util')
const lang = ezio.getString("scrapers");
const { getAudio, getVideo } = require("../lib/y2Mate");

ezio.addCommand(
  { pattern: ["ytmp3", "getmusic", "ytaudio"], desc: "you can dowloade audio from youtube", usage: "<url>", sucReact: "📥", category: ["downloade", "all"],},
  async (message, client) => {
    if (!message.client.text) {
      await client.sendMessage( message.from, { text: `Example : ${  message.client.prefix + message.client.command } https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps` }, { quoted: message });
      return global.catchError = true;
    }
    try {
      if (ezio.func.Bot.isUrl(message.client.args[0])) {
        getAudio(message.client.args[0]).catch(async e => {
          await client.sendErrorMessage(message.from, e, message.key, message);
          return global.catchError = true;
        }).then(async res => {
          if (typeof res == 'object') {
            await client.sendMessage( message.from, { text: `*Downloading* : ${res.title}` }, { quoted: message });
            if (res.filesize >= 999999) {
              await client.sendErrorMessage( message.from, "*File Over Limit:* " + util.format(media), message.key, message);
              return global.catchError = true;
            }
            const aMsg = await client.sendMessage( message.from, { audio: { url: res.dl_link }, mimetype: "audio/mp4" }, { quoted: message });
            await client.sendReact(message.from, "🎧", aMsg.key);
            global.catchError = false;
          } else {
            await client.sendMessage( message.from,{ text: "*Sorry I cant downlode it.*"}, { quoted: message},);
            return global.catchError = true;
          }
        });
      } else {            
        await client.sendMessage( message.from,{ text: "*Where is th link.*"}, { quoted: message},);
        return global.catchError = true;
      }
    } catch (error) {
      await client.sendErrorMessage(message.from, error, message.key, message);
      return (global.catchError = true);
    }
  }
);

ezio.addCommand(
  { pattern: ["ytmp4", "getvideo", "ytvideo"], desc: "you can dowloade video from youtube", usage: "<url>", sucReact: "📥", category: ["downloade", "all"], },
  async (message, client) => {
    if (!message.client.text) {
      await client.sendMessage( message.from, { text: `Example : ${  message.client.prefix + message.client.command } https://youtube.com/watch?v=PtFMh6Tccag%27 360p` }, { quoted: message });
      return global.catchError = true;
    }
    try {
      if (ezio.func.Bot.isUrl(message.client.args[0])) {
        getVideo(message.client.args[0]).catch(async e => {
          await client.sendErrorMessage(message.from, e, message.key, message);
          return global.catchError = true;
        }).then(async res => {
          if (typeof res == 'object') {
            await client.sendMessage( message.from, { text: `*Downloading* : ${res.title}` }, { quoted: message });
            if (res.filesize >= 999999) {
              await client.sendErrorMessage( message.from, "*File Over Limit:* " + util.format(media), message.key, message);
              return global.catchError = true;
            }
            const aMsg = await client.sendMessage( message.from, { video: { url: res.dl_link }, caption: ezio.config.exif.cap }, { quoted: message } );
            await client.sendReact(message.from, "🎞", aMsg.key);
            global.catchError = false;
          } else {
            await client.sendMessage( message.from,{ text: "*Sorry I cant downlode it.*"}, { quoted: message},);
            return global.catchError = true;
          }
        });
      } else {            
        await client.sendMessage( message.from,{ text: "*Where is th link.*"}, { quoted: message},);
        return global.catchError = true;
      }
    } catch (error) {
      await client.sendErrorMessage(message.from, error, message.key, message);
      return (global.catchError = true);
    }
  }
);
