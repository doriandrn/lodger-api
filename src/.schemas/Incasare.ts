/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  interface Incasare extends LodgerDocument {

    suma: Money
    nrChitanta: number

    apartamentId: string
    blocId: string
    asociatieId: string

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
      curs: {
        rata: 0
      }
    })
  }
}

const hooks = {
  postInsert: (ctx) => {
    const { convert } = ctx

    return async (data, $doc) => {
      // const {
      //   asociatieId,
      //   apartamentId,
      //   plata: {
      //     suma: {
      //       value,
      //       moneda
      //     }
      //   }
      // } = data)


      const rels = ['asociatie', 'apartament']
      data.plata = {}

      await Promise.all(rels.map(async rel => {
        const doc = await ctx[rel.plural].collection.findOne(data[`${rel}Id`]).exec()
        // const { balanta: { moneda, value } } = doc
        const newConvertedValue = convert(data.suma.value, data.suma.moneda, doc.balanta.moneda, ctx.rates)

        doc.atomicUpdate(docdata => {
          data.plata[`${rel}BalAnte`] = { ...docdata.balanta }
          docdata.balanta.value = Number(docdata.balanta.value) + Number(newConvertedValue)
          return docdata
        })
      }))

      console.log('pl', data.plata)
      await $doc.atomicUpdate(docdata => { docdata.plata = data.plata })
      console.log('upd')
      // if (!asoc || !ap)
      //   throw new Error('Something went wrong')

      return $doc
    }
  }
}

export {
  fields,
  hooks
}
