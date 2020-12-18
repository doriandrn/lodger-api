import { RxDocument, RxCollection, RxDatabase, _collectionNamePrimary } from 'rxdb'
import { observable, computed } from 'mobx'

import LodgerConfig from 'lodger.config'
import TaxonomyError from '../Error'
import { LodgerFormCreator, Form } from "../Form"
import notify from '../helpers/notify'

export type TaxonomyCreator<I> = LodgerFormCreator<I>

type LodgerTaxonomyCreatorOptions = {
  multipleSelect ?: boolean,
  timestamps ?: boolean
}

enum Errors {
  noDB = 'Please setup a DB first!'
}

/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
interface LodgerTaxonomy<N extends Taxonomie, Interface = {}> {
  readonly collection : RxCollection
  readonly last ?: string

  put (doc: LodgerDocument & Partial<Interface>): Promise<RxDocument<N>> | void
  trash (id: string): Promise<void | null>
}

let db: RxDatabase

/**
 * @class Taxonomy
 * @implements {LodgerTaxonomy}
 *
 * @requires Form
 *
 * @param {Taxonomie} name - name of the form
 * @param {Form} form - the constructed form item
 */
export default class Taxonomy<T extends Taxonomie, Interface = { updatedAt ?: number }>
  implements LodgerTaxonomy<T, Interface> {

  @observable lastItems: string[] = []
  form : Form<Interface>
  $collection ?: RxCollection

  /**
   * Last added item's id
   *
   * @readonly
   * @memberof Taxonomy
   */
  @computed get last () {
    return this.lastItems[0]
  }

  set last (id : string | undefined) {
    if (id) this.lastItems.unshift(id)
    else this.lastItems.shift()
  }

  /**
   * DB handler
   *
   * @static
   * @memberof Taxonomy
   */
  static set db (xdb: RxDatabase) {
    db = xdb
  }

  /**
   * @alias db.destroy
   *
   * @static
   * @memberof Taxonomy
   */
  static async destroy () {
    if (!db) return
    await db.destroy()
  }

  /**
   * Taxonomy name, singular
   *
   * @readonly
   * @memberof Taxonomy
   */
  get name () {
    return this.form.schema.name
  }

  get plural () {
    return this.form.plural
  }

  get _collectionCreator () {
    const { name, methods, statics, } = this._schema
    const { schema } = this.form

    return {
      name,
      schema,
      methods,
      statics
    }
  }

  set collection (collection: RxCollection) {
    const {
      _schema: { hooks },
      options: { timestamps },
      form: { internalFields, plural },
      $lodger: { $taxonomies, freshDates },
      $collection,
      parents,
      children
    } = this

    if ($collection)
      throw new Error(`Collection already set for ${ plurral } taxonomy`)

    // if (timestamps) {
    //   collection.preSave((data) => {
    //     if (!data.updatedAt)
    //       Object.assign(data, freshDates())
    //     return data
    //   }, false)
    // }

    const generalHooks = [
      'Save',
      'Insert',
      'Remove'
    ]

    /**
     * HELPER HOOK FUNCTIONS
     * @param data
     */
    const incCounters = data => {
      data.state.counters[collection.name.plural] += 1
      return data
    }

    const decCounters = data => {
      data.state.counters[collection.name.plural] -= 1
      return data
    }

    const emitDBupdated = () => {
      this.$lodger.emit('dbUpdated')
    }

    const updateParentsStateCounters = hook => async (data, doc) => {
      if (hook && hook === 'Save' && !doc._isTemporary)
        return

      if (!parents || !parents.length)
        return

      const incDec = hook !== 'Remove'

      await Promise.all(parents.map(async parent => {
        let pId = data[`${parent}Id`] || data[parent]
        if (!pId) {
          console.error(`Missing parent(s) id(s) ${parent} for ${plural}`)
          return
        }
        const multiple = typeof pId === 'object' && pId.length >= 1
        pId =  multiple ? pId : [ pId ]
        const coll = $taxonomies[parent.plural].collection
        const parentDoc = multiple ?
          await coll.findByIds(pId) :
          await coll.findOne(pId[0]).exec()

        if (!parentDoc) {
          console.error('Missing parent(s) doc(s)', parent)
          return
        }

        if (!multiple)
          await parentDoc.atomicUpdate(incDec ? incCounters : decCounters)
        else
          if (parentDoc.size)
            await Promise.all(pId.map(async id => {
              const _doc = parentDoc.get(id)
              await _doc.atomicUpdate(incDec ? incCounters : decCounters)
            }))
      }))
    }

    const assignFreshDates = (async (data, doc) => {
      if (!timestamps)
        return

      const dates = freshDates()
      Object.assign(data, !data.updatedAt ? dates : { updatedAt: dates.updatedAt } )

      return data
    })

    const setLastDocument = (updRmv: boolean) => (data, doc) => {
      this.last = updRmv ? doc._id : undefined
    }

    const putInternalFieldsIfMissing = (data, doc) => {
      if (!doc._isTemporary || !children || !children.length)
        return

      Object.assign(data, internalFields)
      return data
    }

    generalHooks
      .filter(h => h !== 'Remove')
      .map(hName => {
        const preHook = `pre${ hName }`
        const postHook = `post${ hName }`

        collection[preHook](assignFreshDates, false)
        collection[postHook](putInternalFieldsIfMissing, false)
      })

    generalHooks.map(hookName => {
      const hook = `post${ hookName }`
      collection[hook](emitDBupdated, true)
      collection[hook](updateParentsStateCounters(hookName), true)
      collection[hook](setLastDocument(hookName !== 'Remove'), true)
    })

    // Schema hooks. Individual for each taxonomy
    if (hooks) {
      Object.keys(hooks).forEach(hook => {
        if (['empty'].indexOf(hook) > -1)
          return

        hooks[hook] = hooks[hook](this.$lodger)
        collection[hook](hooks[hook])
      })
    }

    this.form.fieldsIds
      .filter(fieldId => this.form.fields[fieldId].search)
      .forEach(fieldId => collection.searchFields.push(fieldId))

    this.$collection = collection
  }

  get collection () {
    return this.$collection
  }

  /**
   * Creates an instance of Taxonomy.
   *
   * @param {Form<T, Interface>} form
   * @param {RxCollection<Interface>} collection
   * @memberof Taxonomy
   */
  constructor (
    private _schema: LodgerSchema,
    readonly options : LodgerTaxonomyCreatorOptions = { timestamps: true },
  ) {
    const { name, fields, fieldsets, hooks } = _schema
    const { timestamps, attachments } = options

    this.form = new Form({ name, fields, fieldsets, hooks }, {
      captureTimestamp: timestamps,
      attachments
    })
  }

  /**
   * Relationship between taxonomies
   *
   * @readonly
   * @memberof Taxonomy
   */
  // get refs () {
  //   const { $lodger, form: { fields, fieldsIds } } = this
  //   if (!$lodger)
  //     return {}

  //   return fieldsIds
  //     .filter(id => fields[id].ref)
  //     .map(id => ({
  //       [id]: fields[id].ref
  //     }))
  // }

  @computed get sortOptions () {
    const { $lodger, form: { fields, schema: { indexes } }, name } = this
    const { i18n } = $lodger

    return Object.assign({},
      ...indexes.map(n => {
        const parsedN = n.replace('.[].', '_')
        const simplifiedN = parsedN.split('_')[0]
        const _18n = i18n.taxonomies[name.plural].fields[simplifiedN] ||
          i18n.sort.fields[simplifiedN] ||
          parsedN

        const field = fields[simplifiedN]
        const { type } = field

        const showOrds = type === 'string' ? ['AZ', 'ZA'] : type === 'number' ? ['09', '90'] : ['asc', 'desc']
        return {
          [ _18n ]: {
            [`${ parsedN }-asc`] : showOrds[0],
            [`${ parsedN }-desc`] :  showOrds[1]
          }
        }
      })
    )
  }

  /**
   * * Removes a Document by ID from the collection
   *
   * @param {string} id
   * @returns {RxDocument<T>} removed document
   * @memberof Taxonomy
   */
  async trash (id: string) {
    try {
      await this.collection.findOne(id).remove()
      if (this.last === id) this.last = undefined
    } catch (e) {
      notify({
        type: 'error',
        text: e
      })
    }
  }

  /**
   * * Inserts/upserts a new item in DB
   *
   * @param {Object} doc
   * @returns {RxDocument<Taxonomie>} the fresh document
   *
   * @memberof Taxonomy
   */
  async put (
    doc: Partial<Interface> & LodgerDocument
  ) {
    if (!doc || Object.keys(doc).length < 1)
      throw new TaxonomyError('Invalid doc supplied %%', { doc })

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = doc._id ?
      'upsert' :
      'insert'

    /**
     * do the insert / upsert and following actions
     */
    try {
      const _doc = await this.collection[method](doc)
      const id = _doc._id

      notify({
        type: 'success',
        text: `[${method}] ${this.name}!${['dev', 'test'].indexOf(process.env.NODE_ENV) > -1 ? `(${id})` : ''}`
      })

      return _doc
    } catch (e) {
      notify({ type: 'error', text: String(e) })
    }
  }

  /**
   * @readonly
   * @memberof Taxonomy
   * Taxonomy default config
   */
  get config () {
    const { taxonomii } = LodgerConfig
    const { defaults } = taxonomii
    return taxonomii[this.name] || defaults
  }
}
