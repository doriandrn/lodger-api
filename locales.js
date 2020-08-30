import fs from 'fs'

import ro from './src/lib/locales/ro.js'
import { supportedLangs } from './src/lib/maintainable/langs.js'

import G from '@google-cloud/translate'

const { TranslationServiceClient } = G
const translations = []

function getTranslationsArrayFrom (obj) {
  Object.keys(obj).forEach(o => {
    if (typeof obj[o] === 'string') {
      translations.push(obj[o])
    } else {
      getTranslationsArrayFrom(obj[o])
    }
  })
}

getTranslationsArrayFrom(ro)

const translationClient = new TranslationServiceClient()
const delimiter = ';'

// const entries = {}
const contents = [translations.join(delimiter)]

const sourceLanguageCode = 'ro'

supportedLangs
  .map(lang => lang.code)
  .filter(lang => lang !== sourceLanguageCode)
  .forEach(async targetLanguageCode => {
    console.log('Translating to', targetLanguageCode)

    const request = {
      parent: `projects/lodger-286710`,
      model: `projects/lodger-286710/locations/global/models/general/base`,
      contents,
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode,
      targetLanguageCode,
    };

    try {
      // Run request
      const [response] = await translationClient.translateText(request);
      const { translatedText } = response.translations[0]
      console.log(translatedText)

      let original = JSON.stringify(ro)

      translatedText.split(delimiter).map((phrase, i) => {
        original = original.replace(contents[0].split(delimiter)[i], phrase)
      })

      fs.writeFileSync(`./src/lib/locales/${ targetLanguageCode }.js`, `export default ${original}`)

    } catch (error) {
      console.error(error.details || error);
    }
  })
