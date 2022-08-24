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
    const Message = {
      linkPreview: {
        'canonical-url': 'https://aidarkezio.github.io/',
        'matched-text': 'https://aidarkezio.github.io/',
        title: "Subhadra Bro"
      },
      text: caption
    }
    await client.sendMessage(
      message.from,
      Message,
      {
        quoted: ezio.config.quoted.product,
      }
    );
    global.catchError = false;
  }
);
