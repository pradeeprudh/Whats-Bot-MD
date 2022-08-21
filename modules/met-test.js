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
const fs = require('fs');
const path = require('path');

ezio.addCommand(
  {
    pattern: ["mtest"],
    dontAddCommandList: true,
    sucReact: "🎟",
  },
  async (message, client) => {
    const caption = `------- WhatsApp Groups -------`;
    await client.sendMessage(
      message.from,
      { text: caption },
      {
        quoted: {
          key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(message.jid ? { remoteJid: "status@broadcast", } : {}), },
          message: { imageMessage: { url: "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", mimetype: "image/jpeg", caption: "Dark Ezio", fileSha256: "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", fileLength: "28777", height: 1080, width: 1079, mediaKey: "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", fileEncSha256: "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", directPath: "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", mediaKeyTimestamp: "1610993486", jpegThumbnail: fs.readFileSync(path.join(__dirname, '..', 'database', "image", "Test_Group_Qr.jpeg")), }, },
        },
      }
    );
    global.catchError = false;
  }
);
