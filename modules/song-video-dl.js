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
const lang = ezio.getString("scrapers");
const { getAudio, getVideo } = require("../lib/y2Mate");
const { createCaption } = require("../lib/ezioFunc");


ezio.addCommand(
  { pattern: ["song", 'rsong'], desc: "you can dowloade audio from youtube", usage: "<url|query>", sucReact: "📥", category: ["downloade", "all"], },
  async (message, client) => {
    if (!message.client.text) {
      await client.sendErrorMessage( message.from, lang.NEED_TEXT_SONG, message.key, message);
      return global.catchError = true;
    }
    try {
      if (ezio.func.Bot.isUrl(message.client.args[0])) {
        let url = message.client.args[0];
        getAudio(url).
        catch(async e => {
          await client.sendErrorMessage(message.from, e, message.key, message);
          return global.catchError = true;
        }).then(async res => {
          if (typeof res == 'object') {
            await client.sendMessage( message.from, { text: `*Downloading* : ${res.title}` }, { quoted: message });
            const aMsg = await client.sendMessage( message.from, { audio: { url: res.dl_link }, mimetype: "audio/mp4" }, { quoted: message });
            await client.sendReact(message.from, "🎧", aMsg.key);
            global.catchError = false;
          } else {
            await client.sendErrorMessage(message.from, { text: "*Sorry I cant downlode it.*" }, message.key, message);
            return global.catchError = true;
          }
        });
      } else {
        let text = message.client.text;
        let ytResult = await yts(text)
        if (ytResult.videos?.[0]?.title == undefined) {
          await client.sendErrorMessage(message.from, { text: "*Not youtube result found*" }, message.key, message);
          return global.catchError = true;
        }
        let video = undefined;
        if (message.client.command == "song") { video = ytResult.videos?.[0] } 
        else { video = ytResult.videos?.[Math.floor(Math.random() * ytResult.videos?.length)] } 
        if (video == undefined) {
          await client.sendErrorMessage(message.from, { text: "*Not youtube result found*" }, message.key, message);
          return global.catchError = true;
        }
        let p = message.client.command == "song" ? false : true;
        let caption = createCaption(video, p, ezio);
        const Buttons = [ { buttonId: `ytmp4-s ${video.url}`, buttonText: { displayText: "🎞 Video 📽️" }, type: 1,},];
        const Message = {
          image: { url: video.thumbnail }, caption,
          footer: ezio.config.exif.footer,
          buttons: Buttons,
        };
        await client.sendMessage(message.from, Message, { quoted: message });
        getAudio(video.url).
        catch(async e => {
          await client.sendErrorMessage(message.from, e, message.key, message);
          return global.catchError = true;
        }).then(async res => {
          if (typeof res == 'object') {
            await client.sendMessage( message.from, { text: `*Downloading* : ${res.title}` }, { quoted: message });
            const aMsg = await client.sendMessage( message.from, { audio: { url: res.dl_link }, mimetype: "audio/mp4" }, { quoted: message });
            await client.sendReact(message.from, "🎧", aMsg.key);
            global.catchError = false;
          } else {
            await client.sendErrorMessage(message.from, { text: "*Sorry I cant downlode it.*" }, message.key, message);
            return global.catchError = true;
          }
        });
      }
    } catch (error) {
      await client.sendErrorMessage(message.from, error, message.key, message);
      return (global.catchError = true);
    }
  }
);

ezio.addCommand(
  { pattern: ["ryt-video", "rvideo", "video", "yt-video"], desc: "you can dowloade video from youtube", usage: "<url|query>", sucReact: "📥", category: ["downloade", "all"], },
  async (message, client) => {
    if (!message.client.text) {
      await client.sendErrorMessage( message.from, lang.NEED_TEXT_SONG, message.key, message);
      return global.catchError = true;
    }
    try {
      if (ezio.func.Bot.isUrl(message.client.args[0])) {
        let url = message.client.args[0];
        // let id4 = ytIdRegex?.exec(url);
        getVideo(url).
        catch(async e => {
          await client.sendErrorMessage(message.from, e, message.key, message);
          return global.catchError = true;
        }).then(async res => {
          if (typeof res == 'object') {
            await client.sendMessage( message.from, { text: `*Downloading* : ${res.title}` }, { quoted: message });
            const aMsg = await client.sendMessage( message.from, { video: { url: res.dl_link }, caption: ezio.config.exif.cap }, { quoted: message } );
            await client.sendReact(message.from, "🎞", aMsg.key);
            global.catchError = false;
          } else {
            await client.sendErrorMessage(message.from, { text: "*Sorry I cant downlode it.*" }, message.key, message);
            return global.catchError = true;
          }
        });
      } else {
        let text = message.client.text;
        let ytResult = await yts(text)
        if (ytResult.videos?.[0]?.title == undefined) {
          await client.sendErrorMessage(message.from, { text: "*Not youtube result found*" }, message.key, message);
          return global.catchError = true;
        }
        let video = undefined;
        if (message.client.command == "video" || message.client.command == "yt-video") { video = ytResult.videos?.[0] } 
        else { video = ytResult.videos?.[Math.floor(Math.random() * ytResult.videos?.length)] } 
        if (video == undefined) {
          await client.sendErrorMessage(message.from, { text: "*Not youtube result found*" }, message.key, message);
          return global.catchError = true;
        }
        let p = message.client.command == "video" || message.client.command == "yt-video" ? false : true;
        let caption = createCaption(video, p, ezio);
        const Buttons = [ { buttonId: `ytmp3-s ${video.url}`, buttonText: { displayText: "🎼 Audio 🎵" }, type: 1 }, ];
        const Message = {
          image: { url: video.thumbnail }, caption,
          footer: ezio.config.exif.footer,
          buttons: Buttons,
        };
        await client.sendMessage(message.from, Message, { quoted: message });
        getVideo(video.url).
        catch(async e => {
          await client.sendErrorMessage(message.from, e, message.key, message);
          return global.catchError = true;
        }).then(async res => {
          if (typeof res == 'object') {
            await client.sendMessage( message.from, { text: `*Downloading* : ${res.title}` }, { quoted: message });
            const aMsg = await client.sendMessage( message.from, { video: { url: res.dl_link }, caption: ezio.config.exif.cap }, { quoted: message } );
            await client.sendReact(message.from, "🎞", aMsg.key);
            global.catchError = false;
          } else {
            await client.sendErrorMessage(message.from, { text: "*Sorry I cant downlode it.*" }, message.key, message);
            return global.catchError = true;
          }
        });
      }
    } catch (error) {
      await client.sendErrorMessage(message.from, error, message.key, message);
      return (global.catchError = true);
    }
  }
);
