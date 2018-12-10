/**
 * Main holder for temporary items subscribed to
 * RENDERLESS Vue Component
 *
 * -> a vue helper for reactivity
 * holds RX documents
 * and methods to accezss / manipulate them
 *
 */
import Vue from 'vue'
import { getRxDocumentById } from './helpers/subscribers'

export default new Vue({
  data () { return {
    subsData: {}
  }},

  computed: {
    ids () {
      return (tax: Plural<Taxonomie>, subName: string) => {
        return Object.keys(this.subsData[subName][tax])
      }
    }
  },
  methods: {
    async getItem (
      taxonomie: Plural<Taxonomie>,
      id: string,
      subscriberName ?: string
    ) {
      let item: RxDocument<Taxonomie> | undefined
      const debug = Debug('lodger:getItem')

      if (subscriberName === undefined)
        subscriberName = 'main'

      const { subsData } = this

      try {
        const s = subsData[subscriberName][taxonomie]
        if (s.docs && s.docs.length) return getRxDocumentById(s.docs, id)
      } catch (e) {
        Object.keys(this.subsData).forEach(sub => {
          if (item) return
          const s = subsData[sub][taxonomie]
          if (!(s && s.docs && s.docs.length)) return
          item = getRxDocumentById(s.docs, id)
          if (item) debug('item gasit din a 2a', { taxonomie, subscriberName, s, item })
        })

      } finally {
        // should never get here maybe because data displayed should be available.
        // item = await collections[plural].findOne(id).exec()
      }
      return item
    }
  }
})
