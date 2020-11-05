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
const distDirName = 'dist'
// const distDir = path.resolve( path.resolve(path.dirname('')), `/${distDirName}`)

const currenciesListPath = `${distDirName}/currencies/list/`

if (!fs.existsSync(currenciesListPath))
  fs.mkdirSync(currenciesListPath, { recursive: true })

endpoints.map(ep => {
  axios.get(`${url}/${ep}/map`, { headers })
    .then(({ data }) => {
      fs.writeFileSync(`${currenciesListPath}/${ep}.json`, JSON.stringify(data.data.map(d => {
        const { id, name, symbol, sign } = d
        return { id, name, symbol, sign }
      })))
     })
    .catch(e => { console.error('fml', e) })
})
