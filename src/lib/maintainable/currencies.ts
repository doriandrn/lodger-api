/**
 * Monede
 *
 * @enum {number}
 * @todo add all
 */
export enum Currency {
  BTC, RON, EUR, USD, TRX
}

export default Object
  .keys(Currency)
  .filter(tax => typeof Currency[tax as any] === 'number')
