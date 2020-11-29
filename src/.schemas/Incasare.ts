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
      balantaAnterioara: {
        moneda: '',
        value: 0
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
  postInsert: ctx => function (data, $doc) {
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

    const { convert } = ctx.$lodger

    const rels = ['asociatie', 'apartament']
    rels.map(async rel => {
      const doc = await this.database[rel.plural].findOne(data[`${rel}Id`]).exec()
      // const { balanta: { moneda, value } } = doc
      const newConvertedValue = convert(data.suma.value, doc.balanta.moneda, data.suma.moneda)
      console.log(newConvertedValue, 'ncv')
      doc.atomicUpdate(docdata => {
        docdata.balanta.value += newConvertedValue
        return docdata
      })
    })

    // if (!asoc || !ap)
    //   throw new Error('Something went wrong')

    console.log('incasex', data, rels, this)
  }
}

export {
  fields,
  hooks
}
