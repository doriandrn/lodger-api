import Vue from 'vue';
declare const _default: import("vue/types/vue").CombinedVueInstance<Vue, {
    subsData: {};
}, {
    /**
     * Gets an item from existing temporary items
     * or looks it up in the DB
     *
     * @param {Plural<Taxonomie>} taxonomie
     * @param {string} id
     * @param {string} [subscriberName]
     * @returns {object} the item
     *
     * @todo create a type for the returned item
     */
    getItem(taxonomie: string, id: string, subscriberName?: string | undefined): Promise<any>;
}, {
    ids: (taxonomy: string, subName: string) => string[];
}, Record<never, any>>;
/**
 * Main holder for temporary items subscribed to
 * RENDERLESS Vue Component
 *
 * -> a vue helper for reactivity
 * holds RX documents
 * and methods to accezss / manipulate them
 *
 * @export
 * @returns {Vue} data holder object
 */
export default _default;
