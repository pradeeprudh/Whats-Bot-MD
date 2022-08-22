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
const lang = ezio.getString("github");
const axios = require("axios");

ezio.addCommand({ pattern: ["g-promote"], usage: '<mentions|reply>', sucReact: "😎", category: ["group", "all"], },
  async (message, client) => {
    if (!message.isGroup) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage(ezio.config.reply.group) }, { quoted: message } ); };
    try {
        if (!message.mentions.length == 0) {
            await client.sendMessage( message.from, { text: ezio.infoMessage("😎 Adding new group admin. Using mentions.") }, { quoted: message } );
            await client.groupParticipantsUpdate( message.from, message.mentions, "promote" );
        }
        if (message.quoted) {
            await client.sendMessage( message.from, { text: ezio.infoMessage("😎 Adding new group admin. Using reply.") }, { quoted: message } );
            await client.groupParticipantsUpdate( message.from, [message.quoted.sender], "promote" );
        }
    }  catch (err) {
        global.catchError = true
        await client.sendErrorMessage( message.from, err, message.key, message );
    };
  }
);

ezio.addCommand({ pattern: ["g-demote"], usage: '<mentions|reply>', sucReact: "🤐", category: ["group", "all"], },
  async (message, client) => {
    if (!message.isGroup) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage(ezio.config.reply.group) }, { quoted: message } ); };
    try {
        if (!message.mentions.length == 0) {
            await client.sendMessage( message.from, { text: ezio.infoMessage("🤐 Removing new group admin. Using mentions.") }, { quoted: message } );
            await client.groupParticipantsUpdate( message.from, message.mentions, "demote" );
        }
        if (message.quoted) {
            await client.sendMessage( message.from, { text: ezio.infoMessage("🤐 Removing group admin. Using reply.") }, { quoted: message } );
            await client.groupParticipantsUpdate( message.from, [message.quoted.sender], "demote" );
        }
    }  catch (err) {
        global.catchError = true
        await client.sendErrorMessage( message.from, err, message.key, message );
    };
  }
);

ezio.addCommand({ pattern: ["g-remove"], usage: '<mentions|reply>', sucReact: "😤", category: ["group", "all"], },
  async (message, client) => {
    if (!message.isGroup) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage(ezio.config.reply.group) }, { quoted: message } ); };
    try {
        if (!message.mentions.length == 0) {
            await client.sendMessage( message.from, { text: ezio.infoMessage("😤 Removing group member. Using mentions.") }, { quoted: message } );
            await client.groupParticipantsUpdate( message.from, message.mentions, "remove" );
        }
        if (message.quoted) {
            await client.sendMessage( message.from, { text: ezio.infoMessage("😤 Removing group member. Using reply.") }, { quoted: message } );
            await client.groupParticipantsUpdate( message.from, [message.quoted.sender], "remove" );
        }
    }  catch (err) {
        global.catchError = true
        await client.sendErrorMessage( message.from, err, message.key, message );
    };
  }
);

ezio.addCommand({ pattern: ["g-add"], usage: '<num1/numb2&etc>', sucReact: "😋", category: ["group", "all"], },
  async (message, client) => {
    if (!message.client.text) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage('Enter number: \nEx g-add 1235234509/5672323625/2345456756') }, { quoted: message } ); };
    if (!message.isGroup) { global.catchError = true; return await client.sendMessage( message.from, { text: ezio.errorMessage(ezio.config.reply.group) }, { quoted: message } ); };
    try {
        let array = message.client.text.replace('+', '').replace(' ', '').split('/');
        array.map((item) => (item += "@s.whatsapp.net")); 
        await client.sendMessage( message.from, { text: ezio.infoMessage("😋 Add group member. Using number.") }, { quoted: message } );
        await client.groupParticipantsUpdate( message.from, [array], "add" );
    }  catch (err) {
        global.catchError = true
        await client.sendErrorMessage( message.from, err, message.key, message );
    };
  }
);

// replace this parameter with  "add", "remove", "demote" or "promote"