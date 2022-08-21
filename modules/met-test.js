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
      {
        text: caption,
        contextInfo: {
           externalAdReply: {

        /** ExternalAdReplyInfo title */
        title: "Title",

        /** ExternalAdReplyInfo body */
        body: 'body',

        /** ExternalAdReplyInfo mediaType */
        mediaType: 1,

        /** ExternalAdReplyInfo mediaUrl */
        mediaUrl: ezio.config.image.url.D_E_DPC,

        /** ExternalAdReplyInfo sourceUrl */
        sourceUrl: ezio.config.exif.web,

        /** ExternalAdReplyInfo containsAutoReply */
        containsAutoReply: true,

        /** ExternalAdReplyInfo showAdAttribution */
        showAdAttribution: true
    }}
      },
      {
        quoted: message,
      }
    );
    global.catchError = false;
  }
);
