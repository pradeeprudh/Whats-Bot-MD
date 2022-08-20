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

const auto = {
  presence: {
    is: false, // Boolean
    value: "recoding", // recoding , typing
  },
  read: true, // Boolean
};
const image = {
  url: {
    D_E_DPC:
      "https://raw.githubusercontent.com/AiDarkEzio/Whats-Bot/master/GojoMedia/D_E-DPC.jpg",
    D_E_TMB:
      "https://raw.githubusercontent.com/AiDarkEzio/Whats-Bot/master/GojoMedia/D_E-TMB.jpg",
    D_E_DP_:
      "https://raw.githubusercontent.com/AiDarkEzio/Whats-Bot/master/GojoMedia/D_E-DP.jpg",
  },
};
const api = {
  github: {
    domain: "https://api.github.com",
  },
  textpro: {
    domain: "https://textpro.me",
    takes1: require('./textPro').takes1,
    takes2: require('./textPro').takes2,
  },
  waifu: {
    domain: "https://api.waifu.pics",
    sfw: [ "waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry", "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk", "yeet", "blush", "smile", "wave", "highfive", "handhold", "nom", "bite", "glomp", "slap", "kill", "kick", "happy", "wink", "poke", "dance", "cringe"],
    nsfw: [ "waifu", "neko", "trap", "blowjob" ],
  },
}; 
const reply = {
  notFound: 'This Command not created. it was creating',
  success: "Done ✓",
  admin: "This Feature Is Only For Admin!",
  botAdmin: "Bot Must Be Admin First!",
  owner: "This Feature Is Only For Owner!",
  group: "Feature Used Only For Groups!",
  private: "Features Used Only For Private Chat!",
  bot: "This Feature Is Only For Bot",
  wait: "In process...",
  linkm: "Where is the link?",
  error: "Error!!",
  endLimit: "Your Daily Limit Has Expired, The Limit Will Be Reset Every 12 Hours",
  ban: "You have been banned by the owner, if you want to be unbanned, chat owner.",
  nsfw: "The nsfw feature has not been activated, please contact the admin to activate",
  banChat: "The bot was banned in this group, please contact the owner to unban",
};
const docs = {
  d1: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  d2: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  d3: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  d4: "application/zip",
  d5: "application/pdf",
  d6: "application/vnd.android.package-archive",
};
const exif = {
  footer: "©›Dark_Ezio",
  packname: "Whats Bot MD",
  name: "Whats-Bot-MD",
  author: "AiDarkEzio",
  owner: ["94761539856"],
  cap: "*Cerated by Whats_Bot-MD*",
  web: "https://AiDarkEzio.github.io",
  github: "https://github.com/aidarkezio",
  sc: "https://github.com/AiDarkEzio/Whats-Bot.git",
  YT: "https://www.youtube.com/channel/UCeDeaDD8dpdMT2gO3VHY1JQ",
};
const quoted = { 
  quoted1: {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(message.from ? { remoteJid: "status@broadcast", } : {}), },
    message: { imageMessage: { url: "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", mimetype: "image/jpeg", caption: "Dark Ezio", fileSha256: "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", fileLength: "28777", height: 1080, width: 1079, mediaKey: "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", fileEncSha256: "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", directPath: "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", mediaKeyTimestamp: "1610993486", jpegThumbnail: fs.readFileSync(path.join(__dirname, '..', 'database', "image", "Test_Group_Qr.jpeg")), }, },
  },
}


module.exports = {
  auto,
  reply,
  api,
  docs,
  exif,
  image,
  quoted,
};
