
/**
 * Transforma inputu la tastare
 * @param {string} filtersList - requested filters to comp
 * @param {string} value - input value for
 * @param {filters} the object containing the filters ($options.filters)
 */
export const transformOnInput = (filtersList, value, filters, debug) => {
  let val = value
  if (!filtersList) return val
  const _filters = filtersList.split('|')
  _filters.forEach(_filter => {
    let filter = _filter

    // :all = toate cuvintele
    if (filter.indexOf(':all')) {
      filter = filter.replace(':all', '')
      val = value.split(' ')
      val.forEach((word, i) => {
        try {
          val[i] = filters[filter](word)
        } catch (e) {
          debug(`Filtru incorect: ${filter}`, type, value)
        }
      })
      val = val.join(' ')
    } else {
      try {
        val = filters[filter](val)
      } catch (e) {
        debug(`Filtru incorect: ${filter}`, type, value)
      }
    }
  })
  return val
}
