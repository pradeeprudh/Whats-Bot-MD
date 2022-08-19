require("./global")
const { 
    default: WASocket, 
    DisconnectReason, 
    useSingleFileAuthState, 
    fetchLatestBaileysVersion, 
    delay, 
    jidNormalizedUser, 
    makeInMemoryStore,
    DEFAULT_CONNECTION_CONFIG, 
    DEFAULT_LEGACY_CONNECTION_CONFIG,
    proto
} = require("@adiwajshing/baileys")
const fs = require("fs")
const chalk = require("chalk")
const pino = require("pino")
const yargs = require("yargs")
const path = require("path")
const { Boom } = require("@hapi/boom")
const { Collection, Simple, Store, upsert } = require("./lib")
const WebMessageInfo = proto.WebMessageInfo
const Welcome = require("./lib/Welcome");
const jsoConfig = JSON.parse(fs.readFileSync('./config.json'))
const ezio = require('./events')
const { serialize, WAConnection } = Simple
const Commands = new Collection()
// global.prefa = /^[#$+.?_&<>!/\\]/
// Commands.prefix = prefa

// ## globle vars
global.mydb = {};
global.mydb.users = new Array();
global.mydb.hits = new Number();
global.catchError = false;

// ## auth state
const { state, saveState } = useSingleFileAuthState('./database/baileys/auth_info.json', pino({ level: 'silent' }))
// ## store
const store = makeInMemoryStore({logger: pino().child({ level: "silent", stream: "store" })});
store.readFromFile("./database/json/baileys/store_multi.json");
setInterval(() => {store.writeToFile("./database/baileys/store_multi.json")}, 30 * 1000);
// ## requiring commands
fs.readdirSync("./modules").forEach( file => { if ( path.extname(file).toLowerCase() == ".js" ) { require(`./modules/${file}`) }});
// ## api
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in jsoConfig.APIs ? jsoConfig.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: jsoConfig.APIs.apikey } : {}) })) : '')


// const readCommands = () => {
//     let dir = path.join(__dirname, "./commands")
//     let dirs = fs.readdirSync(dir)
//     let listCommand = {}
//     try {
//         dirs.forEach(async (res) => {
//             let groups = res.toLowerCase()
//             Commands.type = dirs.filter(v => v !== "_").map(v => v)
//             listCommand[groups] = []
//             let files = fs.readdirSync(`${dir}/${res}`).filter((file) => file.endsWith(".js"))
//             //console.log(files)
//             for (const file of files) {
//                 const command = require(`${dir}/${res}/${file}`)
//                 listCommand[groups].push(command)
//                 Commands.set(command.name, command)
//                 delay(100)
//             }
//         })
//         Commands.list = listCommand
//     } catch (e) {
//         console.error(e)
//     }
// }

const WhatsBotConnect = async () => {
    // await readCommands()
    let { version, isLatest } = await fetchLatestBaileysVersion()
    let connOptions = {
      printQRInTerminal: true,
      browser: ["Ai Dark Ezio", "Safari", "4.0.0"],
      logger: pino({ level: "silent" }),
      auth: state,
      version,
    };

    let conn = WASocket(connOptions);
    conn = new WAConnection(conn);
    // global.Store = Store.bind(conn);
    store.bind(conn.ev)
    conn.ev.on("creds.update", saveState);

    conn.ev.on("connection.update", async(update) => {
        const { lastDisconnect, connection, isNewLogin, isOnline, qr, receivedPendingNotifications } = update;
        if (connection == 'connecting') {
            console.log(chalk.yellow("👩 Connecting to WhatsApp...▶"));
        } else if (connection == 'open') {
            console.log(chalk.green("👩 Login successful! ▶")); 
        } else if (connection == "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession) { 
                console.log(chalk.red(`💥 Bad Session File, Please Delete Session and Scan Again`)); 
                conn.logout(); 
            } else if (reason === DisconnectReason.connectionClosed) { 
                console.log(chalk.red("💥 Connection closed, reconnecting....")); 
                WhatsBotConnect(); 
            } else if (reason === DisconnectReason.connectionLost) { 
                console.log(chalk.red("💥 Connection Lost from Server, reconnecting...")); 
                WhatsBotConnect(); 
            } else if (reason === DisconnectReason.connectionReplaced) { 
                console.log(chalk.red("💥 Connection Replaced, Another New Session Opened, Please Close Current Session First")); 
                conn.logout(); 
            } else if (reason === DisconnectReason.loggedOut) { 
                console.log(chalk.red(`💥 Device Logged Out, Please Scan Again And Run.`)); 
                process.exit(0)
            } else if (reason === DisconnectReason.restartRequired) { 
                console.log(chalk.red("💥 Restart Required, Restarting...")); 
                WhatsBotConnect(); 
            } else if (reason === DisconnectReason.timedOut) { 
                console.log(chalk.red("💥 Connection TimedOut, Reconnecting...")); 
                WhatsBotConnect(); 
            } else conn.end(chalk.red(`💥 Unknown DisconnectReason: ${reason}|${connection}`));
        } else if (isOnline === true) { 
            console.log(chalk.blue("👩 Online.")); 
        } else if (isOnline === false) { 
            console.log(chalk.red("👩 Offine.")); 
        } else if (receivedPendingNotifications === true) { 
            console.log(chalk.blue("👩 Received Pending Notifications.")); 
        } else if (receivedPendingNotifications === false) { 
            console.log(chalk.red("👩 Not Received Pending Notifications.")); 
        } else if (isNewLogin === true) { 
            console.log(chalk.blue("👩 New Login.")); 
        } else if (isNewLogin === false) { 
            console.log(chalk.red("👩 Not New Login.")); 
        } else if (qr) {
            console.log(chalk.magenta('Qr: '), chalk.magentaBright(qr));
        } else console.log("👩 Connection...", update);
    })

    // Welcome
    conn.ev.on("group-participants.update", async (m) => {
		Welcome(conn, m);
	});

    conn.ev.on("messages.upsert", async (chatUpdate) => {
        let m = chatUpdate.messages[0]
        m = new serialize(conn, m);
        if (!m.message) return
        if (m.key && m.key.remoteJid == "status@broadcast") return
        if (m.key.id.startsWith("BAE5") && m.key.id.length == 16) return
        if (global.mydb.users.indexOf(m.sender) == -1) global.mydb.users.push(m.sender);
        // if (ezio.config.auto.read) await conn.sendReadReceipt(m.key.remoteJid, m.key.participant, [ m.key.id ]);
        // require("./module")(conn, m, Commands, chatUpdate)
        await upsert(conn, m);

        try {
            ezio.commands.map(async command => {
                for (let i in command.pattern) {
                    if (command.pattern[i] == m.client.command || command.on == 'text') {
                        global.mydb.hits += 1;
                        global.catchError = false;
                        await conn.sendReact( m.from, await ezio.reactArry("INFO"), m.key);
                        await conn.sendPresenceUpdate(ezio.config.auto.presence.value, m.from);
                        try { await command.function(m, conn);
                        } catch (error) { 
                            global.catchError = true;
                            console.log(error);
                        }
                        global.catchError
                            ? await conn.sendReact(m.from, await ezio.reactArry("ERROR"), m.key)
                            : await conn.sendReact(m.from, command.sucReact, m.key);
                        await conn.sendPresenceUpdate("available", m.from);
                    }
                }
            });
        } catch (e) {
            console.log(e);
        } 
    });

    setInterval(async () => {
        const get_localized_date = { weekday: "long", year: "numeric", month: "long", day: "numeric", };
        var utch = new Date().toLocaleDateString("EN", get_localized_date);
        var ov_time = new Date().toLocaleString("LK", { timeZone: "Asia/Colombo" }).split(" ")[1];
        const biography = "📅 " + utch + "\n⌚ " + ov_time + "\n\n💗 Auto Bio Powered By Whats Bot...💬\n\n👨🏼‍💻 Created By Dark_Ezio";
        await conn.updateProfileStatus(biography);
    }, 1000 * 10);

    if (conn.user && conn.user?.id) conn.user.jid = jidNormalizedUser(conn.user?.id)
    conn.logger = (conn.type == "legacy") ? DEFAULT_LEGACY_CONNECTION_CONFIG.logger.child({ }) : DEFAULT_CONNECTION_CONFIG.logger.child({ })
}

WhatsBotConnect()
