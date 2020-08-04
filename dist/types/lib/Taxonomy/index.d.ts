import { RxDocument, RxCollection, RxDatabase } from 'rxdb';
import { LodgerFormCreator, Form } from "../Form";
export declare type TaxonomyCreator<I> = LodgerFormCreator<I>;
declare type LodgerTaxonomyCreatorOptions = {
    multipleSelect?: boolean;
    timestamps?: boolean;
};
/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
interface LodgerTaxonomy<N extends Taxonomie, Interface = {}> {
    readonly collection: RxCollection;
    readonly last?: string;
    put(doc: LodgerDocument & Partial<Interface>): Promise<RxDocument<N>> | void;
    trash(id: string): Promise<RxDocument<N> | null>;
}
/**
 * @class Taxonomy
 * @implements {LodgerTaxonomy}
 *
 * @requires Form
 *
 * @param {Taxonomie} name - name of the form
 * @param {Form} form - the constructed form item
 */
export default class Taxonomy<T extends Taxonomie, Interface = {}> implements LodgerTaxonomy<T, Interface> {
    protected form: Form<Interface>;
    readonly options?: LodgerTaxonomyCreatorOptions | undefined;
    lastItems: string[];
    refsIds: string[];
    /**
     * Last added item's id
     *
     * @readonly
     * @memberof Taxonomy
     */
    get last(): string | undefined;
    set last(id: string | undefined);
    /**
     * DB handler
     *
     * @static
     * @memberof Taxonomy
     */
    static set db(xdb: RxDatabase);
    /**
     * @alias db.destroy
     *
     * @static
     * @memberof Taxonomy
     */
    static destroy(): Promise<void>;
    get plural(): string;
    /**
     * Init function that builds up the form and collection
     *
     * @static
     * @param {TaxonomyCreator<Taxonomie>} data
     * @param {LodgerTaxonomyCreatorOptions} [options={}]
     * @returns {Taxonomy}
     * @memberof Taxonomy
     */
    static init(data: TaxonomyCreator<Taxonomie>, options?: LodgerTaxonomyCreatorOptions): Promise<Taxonomy<any, "Apartament" | "Asociatie" | "Bloc" | "Cheltuiala" | "Contor" | "Factura" | "Furnizor" | "Incasare" | "Serviciu" | "Utilizator">>;
    /**
     * Creates an instance of Taxonomy.
     *
     * @param {Form<T, Interface>} form
     * @param {RxCollection<T>} collection
     * @memberof Taxonomy
     */
    constructor(form: Form<Interface>, collection: RxCollection<T>, options?: LodgerTaxonomyCreatorOptions | undefined);
    /**
     *
     *
     * @readonly
     * @memberof Taxonomy
     */
    get name(): any;
    /**
     * Removes a Document by ID from the collection
     *
     * @param {string} id
     * @returns {RxDocument<T>} removed document
     * @memberof Taxonomy
     */
    trash(id: string): Promise<any>;
    /**
     * Inserts/upserts a new item in DB
     *
     * @param {Object} doc
     * @returns {RxDocument<Taxonomie>} the fresh document
     *
     * @memberof Taxonomy
     */
    put(doc: Partial<Interface> & LodgerDocument): Promise<any>;
    /**
     * @readonly
     * @memberof Taxonomy
     * Taxonomy default config
     */
    get config(): {
        criteriu: any;
    };
}
export {};
