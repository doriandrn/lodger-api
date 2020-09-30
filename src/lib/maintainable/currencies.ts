

/**
 * Monede
 *
 * @enum {number}
 * @todo add all
 */
export enum Currency {
  BTC, RON, EUR, USD, CAD, DASH, XRP
}

export default Object
  .keys(Currency)
  .filter(tax => typeof Currency[tax as any] === 'number')
