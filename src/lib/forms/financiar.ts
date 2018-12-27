export const campuri = [
  {
    id: 'balanta',
    label: 'asociatie.init.balanta',
    required: true,
    type: 'bani',
    '@change': 'asociatie/initBalanta',
    value (getters) { return getters['asociatie/balanta'] }
  },
  {
    id: 'dataDinLunaListe',
    label: 'asociatie.init.dataDinLuna',
    required: true,
    type: 'number',
    max: 28,
    min: 1
  }
]

export const actiuni = {
  confirm: 'initDone'
}
