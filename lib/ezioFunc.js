const tts = require("google-tts-api");

async function TTS (text, lang = 'en') {
    let result = new String
    if (text.length <= 200 ) {
        result = tts.getAudioUrl(text, { lang, slow: false });
    } else result = new Error('Text is to long. can not convert your text')
    return result;
};

module.exports = { TTS }
