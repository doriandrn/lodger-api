export default {
  next: 'Continuă',
  back: 'Înapoi',
  backTo: 'Înapoi la',
  search: 'Caută',
  nav: {
    statistici: 'Statistici',
    liste: 'Liste de plată',
    istoric: 'Istoric',
    comunitate: 'Comunitate',
    docs: 'Documentație',
    support: 'Asistență tehnică'
  },
  disclaimers: {
    money: 'Cursul valutar este doar pentru scop informațional',
    beta: 'Aplicația este în versiunea beta și poate prezenta reacții adverse'
  },
  // forms: {
  //   langSwitch: {
  //     fields: {
  //       selector: 'Schimbă limba'
  //     }
  //   }
  // },
  taxonomies: {
    apartamente: {
      name: 'Apartament',
      plural: 'Apartamente',
      fieldsets: {
        descriere: 'Descriere',
        localizare: 'Localizare',
        registru: 'Registru'
      },
      fields: {
        suprafata: 'Suprafață',
        locatari: 'Locatari'
      }
    },
    asociatii: {
      name: 'Asociație',
      plural: 'Asociații',
      fields: {

      }
    },
    blocuri: {
      name: 'Clădire',
      plural: 'Clădiri',
    },
    cheltuieli: {
      name: 'Cheltuială',
      plural: 'Cheltuieli'
    },
    contoare: {
      name: 'Contor',
      plural: 'Contoare'
    },
    facturi: {
      name: 'Factură',
      plural: 'Facturi'
    },
    furnizori: {
      name: 'Furnizor',
      plural: 'Furnizori'
    },
    incasari: {
      name: 'Încasare',
      plural: 'Încasări'
    },

    servicii: {
      name: 'Serviciu',
      plural: 'Servicii'
    },
    utilizatori: {
      name: 'Utilizator',
      plural: 'Utilizatori',
      new: {
        title: 'Hai să facem cunoștință!'
      },
      fields: {
        name: 'Nume complet',
        avatar: 'Avatar',
        contact: 'Detalii de contact',
        tel: 'Număr de telefon',
        email: 'Adresă e-mail',
        social: 'Social Media',
        preferinte: 'Preferințe',
        langSwitch: 'Schimbă limba'
      }
    }
  },
  welcome: {
    title: 'Bun venit!',
    intro: 'Îți mulțumim că ai ales să încerci Lodger!'
  },
  errors: {
    index: {
      missingDB: 'Bază de date nespecificată',
      invalidPluginDefinition: 'Plugin invalid',
      couldNotWriteFile: 'Fișierul %% nu poate fi scris'
    }
  }
}
