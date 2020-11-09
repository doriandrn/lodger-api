import axios from 'axios'
import fs from 'fs'
// import path from 'path'
import apiKey from '../../../keys/CoinMarketCap.js'

const url = 'https://pro-api.coinmarketcap.com/v1'
const endpoints = [
  'fiat',
  'cryptocurrency'
]
const headers = { 'X-CMC_PRO_API_KEY': apiKey }

const staticDataDir = 'src/lib/static/data'

const currenciesPath = `${ staticDataDir }/currencies`
const currenciesListPath = `${ currenciesPath }/list/`
const quotesUrl = `${ url }/cryptocurrency/quotes/latest`

let list = {}

const preferredCryptos = [ 1, 2 ]

function processData (data) {
  if (data.status) {
    data.timestamp = data.status.timestamp
    delete data.status
  }
  return data
}

try {
  endpoints.map(e => {
    const { timestamp, data } = JSON.parse(fs.readFileSync(`${ currenciesListPath }/${ e }.json`))
    list[e] = e === 'fiat' ? data : data.filter(c => preferredCryptos.indexOf(c.id) > -1)
  })
} catch (e) {
  console.info('No currencies found, getting from CMC...', e)

  if (!fs.existsSync(currenciesListPath)){
    fs.mkdirSync(currenciesListPath, { recursive: true })

    // get fiat and crypto currencies list and write to static
    // Reminder: delete list/ folder to update
    endpoints.map(ep => {
      axios.get(`${url}/${ep}/map`, { headers })
        .then(({ data }) => {
          data = processData(data)
          data.data = data.data.map(d => {
            const { id, name, symbol, sign } = d
            return { id, name, symbol, sign }
          })
          list[ep] = data
          fs.writeFileSync(`${currenciesListPath}/${ep}.json`, JSON.stringify(data))
         })
        .catch(e => { console.error('Could not update currencies list: ', e) })
    })
  }
}

const ids = [ ...preferredCryptos, ...list.fiat.map(c => c.id) ]

fs.writeFileSync(`${ currenciesPath }/ids.json`, JSON.stringify(ids))
fs.writeFileSync(`${ currenciesPath }/list.json`, JSON.stringify(list))

const symNames = {}
endpoints.forEach(e => {
  Object.keys(list[e]).forEach(id => {
    const d = list[e][id]
    const { name, symbol } = d
    symNames[symbol] = name
  })
})
fs.writeFileSync(`${ currenciesPath }/symbols-names.json`, JSON.stringify(symNames))

axios.get(quotesUrl, {
  headers,
  params: {
    id: ids.toString()
  }
}).then(({ data }) => {
  if (!data.data)
    return

  data = processData(data)

  Object.keys(data.data).forEach(d => {
    const { quote } = data.data[d]
    data.data[d] = quote[Object.keys(quote)[0]].price
  })

  fs.writeFileSync(`${currenciesPath}/rates.json`, JSON.stringify(data))
}).catch(e => {
  console.error('GET QUOTES FAILED')
})
