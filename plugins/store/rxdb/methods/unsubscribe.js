import { subs } from '../subs'

/**
 * Sterge subscriberii de DB cand se demonteaza
 * @param {*} subs - obiectul cu subscriberi
 */
export default async ({ type }) => {
  if (type !== "DESTROYMAIN") return
  Object.keys(subs).forEach(sub => {
    delete subs[sub]
  })
}
