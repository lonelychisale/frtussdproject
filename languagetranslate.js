const translator = require('translate');
const response = 'hello there'

async function languagetranslator(message,translateto){
    translateto.engine ='libre'
    const translatedstring = await translator(message,translateto)
    console.log(translatedstring)
}
languagetranslator(response,'chichewa')