import fs from 'fs'

// import ro from '../locales/ro.js' // se f**e cand ii dau din consola ubild:locales asa
import { supportedLangs } from './langs.js'
import ro from '../locales/ro.js'

import G from '@google-cloud/translate'

const { TranslationServiceClient } = G
const translations = []

function getTranslationsArrayFrom (obj) {
  Object.keys(obj).forEach(o => {
    if (typeof obj[o] === 'string') {
      translations.push(String(obj[o]).trim())
    } else {
      getTranslationsArrayFrom(obj[o])
    }
  })
}

getTranslationsArrayFrom(ro)

const translationClient = new TranslationServiceClient()
const delimiter = '*'

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

      let original = JSON.stringify(ro)

      // console.log(translatedText)

      translatedText.split(delimiter).map((phrase, i) => {
        let trimmed = phrase.trim() || ''
        trimmed = trimmed.indexOf('! ') === 0 ? trimmed.substr(2, trimmed.length) : trimmed

        console.log(`${ trimmed }\n`)
        original = original.replace(contents[0].split(delimiter)[i], trimmed)
      })

      fs.writeFileSync(`./src/lib/locales/${ targetLanguageCode }.js`, `export default ${original}`)
    } catch (error) {
      console.error(error.details || error);
    }
  })
