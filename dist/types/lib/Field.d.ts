import { RxJsonSchemaTopLevel, RxDocument, JsonSchemaTypes } from "rxdb";
import { GetterTree } from "vuex";
import { RootState } from "./Store";
import { strings, numbers, arrays, objects } from './String';
type ItemExcludableFrom = 'db' | 'addForm' | 'editForm' | 'all';
type ReferenceTaxonomy = Plural<Taxonomie>;
type FieldGivenContext<N> = {
    getters: GetterTree<N, RootState>;
    selectedDoc?: RxDocument<N>;
    activeDoc?: RxDocument<N>;
};
type FieldTypes = keyof typeof strings | keyof typeof numbers | keyof typeof arrays | keyof typeof objects | undefined;
declare global {
    type ID<X extends Taxonomie> = string;
    type FieldCreator<T> = {
        id: keyof T;
        label?: string;
        placeholder?: string;
        default?: any | Function;
        value?: (context?: FieldGivenContext<T>) => any;
        type?: FieldTypes;
        required?: boolean;
        encrypted?: boolean;
        index?: boolean;
        excludeFrom?: ItemExcludableFrom | ItemExcludableFrom[];
        name?: string;
        options?: Array<any> | Object;
        step?: number;
        min?: number;
        max?: number;
        v?: string;
        ref?: ReferenceTaxonomy;
        indexRef?: boolean;
        showInList?: 'primary' | 'secondary' | 'details'[];
        onclick?: {
            [method: string]: string;
        };
        oninput?: {
            [method: string]: string;
        };
    };
}
/**
 * @interface FormField
 * @extends RxJsonSchemaTopLevel
 */
interface FormField<T> extends RxJsonSchemaTopLevel {
    rxSchema(): RxJsonSchemaTopLevel;
    value(context?: FieldGivenContext<T>): any;
    onclick?: (context?: FieldGivenContext<T>) => void;
}
/**
 *
 * @class Form Field Item
 * @implements {SchemaField}
 * @requires [String]
 * @extends RxJsonSchemaTopLevel
 */
export declare class Field<T> implements FormField<T> {
    readonly id: keyof T;
    readonly type: JsonSchemaTypes;
    readonly ref?: ReferenceTaxonomy;
    readonly items?: {
        type: 'string';
    };
    readonly index?: boolean;
    readonly multipleOf?: number;
    readonly v?: string;
    readonly storage?: 'db' | 'store';
    readonly default?: any;
    readonly value: (context?: FieldGivenContext<T>) => any;
    /**
     * Creates an instance of Field.
     *
     * @param {FieldCreator<T>} data
     * @memberof Field
     */
    constructor(data: FieldCreator<T>);
    rxSchema(): {};
}
export {};
