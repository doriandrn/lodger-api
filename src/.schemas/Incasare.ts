/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  interface Incasare extends LodgerDocument {

    suma: Money
    nrChitanta: number

    apartamentId: string
    blocId: string
    asociatieId: string

    cheltuieli: string[]

    plata: Plata
  }
}

const fields: FieldsCreator<Incasare> = {
  suma: {
    type: '$',
    preview: 1,
    index: true,
    required: true
  },
  nrChitanta: {
    type: 'number',
    default: 1,
    search: true,
    preview: 0,
    index: true,
    value: ({ activeDoc }) => (activeDoc.nrUltimaChitanta || 0) + 1
  },

  //aka DE LA
  apartamentId: {
    required: true,
    type: 'search',
    ref: 'apartamente',
    preview: 2
  },
  cheltuieli: {
    ref: 'cheltuieli',
    preview: 3
  },

  // ASTEA TREBUIE SA RAMANA IN CAZ CA UN APARTAMENT SE STERGE
  // TREBUIE SA FIGUREZE
  /// !!!!!!!!!!!!!!!!
  blocId: {
    required: true,
    index: true,
    value: (g) => g['bloc/selected'].id
  },
  asociatieId: {
    required: true,
    index: true,
    value: (g) => g['asociatie/selected'].id
  },

  plata: {
    type: 'object',
    default: () => ({
      metoda: 'fiat:banca',
      // metoda: 'crypto:nano',
      asociatieBalAnte: {
        moneda: 1,
        value: 1
      },
      apartamentBalAnte: {
        moneda: 1,
        value: 1
      },
      achitata: {
        status: false,
        la: 0
      },
      curs: 1
    })
  }
}

const hooks = {
  postInsert: (ctx) => {
    const { convert, rates } = ctx
    const rels = ['asociatie', 'apartament']

    return async (data, $doc) => {
      data.plata = {
        curs: rates[data.suma.moneda]
      }

      await Promise.all(rels.map(async rel => {
        const doc = await ctx[rel.plural].collection.findOne(data[`${rel}Id`]).exec()
        // const { balanta: { moneda, value } } = doc
        const newConvertedValue = convert(data.suma.value, data.suma.moneda, doc.balanta.moneda, ctx.rates)

        doc.atomicUpdate(docdata => {
          data.plata[`${rel}BalAnte`] = { ...docdata.balanta }
          docdata.balanta.value = Number(docdata.balanta.value) + Number(newConvertedValue)

          // if (rel === 'asociatie') {
          //   ctx.state.
          // }

          return docdata
        })
      }))

      $doc.atomicUpdate(docdata => { docdata.plata = data.plata; return docdata })

      return $doc
    }
  }
}

export {
  fields,
  hooks
}
