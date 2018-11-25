export const setari = {
  regionale: {
    campuri: [
      {
        id: 'limba',
        type: 'select',
        '@change': 'schimbaLimba',
        value: g => g.locale,
        options: g => g.limbiChoose
      },
      {
        id: 'moneda',
        type: 'select',
        value: g => g.moneda,
        options: g => g.monede
      }
    ]
  }
}
