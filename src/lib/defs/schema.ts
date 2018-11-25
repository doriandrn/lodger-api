// type LodgerSchema = {
//   [taxonomie: string]: any
// }

// const schema: LodgerSchema = {
//   $asociatie: {
//     _plural: 'asociatii',
//     $incasare: {
//       _plural: 'incasari',
//       _sortOptions: { la: -1 },
//       _defaultLimit: 25
//     },
//     $cheltuieala: {
//       _plural: 'cheltuieli',
//       _sortOptions: { la: -1 },
//       _defaultLimit: 25
//     },
//     $bloc: {
//       _plural: 'blocuri',
//       $apartament: {
//         _plural: 'apartamente',
//         _cheiCautare: ['bloc.nume', 'scara', 'nr', 'proprietar']
//       }
//     }
//   },
//   $serviciu: {
//     _plural: 'servicii'
//   },
//   $furnizor: {
//     _plural: 'furnizori',
//     _cheiCautare: ['nume']
//   },
//   $utilizator: {
//     _plural: 'utilizatori',
//     _cheiCautare: ['username', 'emailPublic']
//   },
//   notificari: ['error', 'warn', 'info', 'success']
// }

// export default schema
