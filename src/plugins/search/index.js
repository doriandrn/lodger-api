// import { helperCautare, definitii } from 'lodger/definitii'

/**
 * Construieste un search map
 * (bazat pe stringuri)
 * dupa obiectele continute de taxonomie
 *
 * @param {*} helperCautare
 * @param {*} getters
 */
const searchMap = (helperCautare, getters) => {
  const searchObjs = {}
  Object.keys(helperCautare).forEach(cat => {
    searchObjs[cat] = new Map()
    Object.values(getters[cat]).forEach(item => {
      let helperCautaretring = ''
      helperCautare[cat].forEach(searchKey => {
        let ss = ''
        if (searchKey.indexOf('.') > -1) {
          const splt = String(searchKey).split('.')
          const id = item[splt[0]]
          const key = splt[1]
          const what = definitii.get(splt[0])
          ss = `${getters[what] && getters[what][id] ? getters[what][id][key] : ''} `
        } else {
          ss = `${item[searchKey]} `
        }

        if (ss && ss !== 'undefined') helperCautaretring += ss
      })
      searchObjs[cat].set(item._id, helperCautaretring.trim())
    })
  })
  return searchObjs
}

export { searchMap }
