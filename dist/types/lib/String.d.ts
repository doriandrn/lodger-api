import { JsonSchemaTypes } from "rxdb";
declare type SplitObject = {
    what: string;
    mutation: string;
};
/**
 * Accepted 'string's for a LodgerSchema field
 *
 * @enum {number}
 */
export declare enum strings {
    search = 0,
    select = 1,
    string = 2,
    text = 3,
    textarea = 4
}
/**
 * Accepted 'number's for a LodgerSchema field
 *
 * @enum {number}
 */
export declare enum numbers {
    date = 0,
    dateTime = 1,
    number = 2
}
/**
 * Accepted 'array's for a LodgerSchema field
 *
 * @enum {number}
 */
export declare enum arrays {
    array = 0,
    contactFields = 1,
    contoare = 2,
    distribuire = 3,
    furnizori = 4,
    selApartamente = 5,
    servicii = 6,
    scari = 7
}
/**
 * Accepted 'object's for a LodgerSchema field
 *
 * @enum {number}
 */
export declare enum objects {
    bani = 0,
    object = 1,
    organizatie = 2
}
declare global {
    /**
     * String helpers extensions
     *
     * @interface String
     */
    interface String {
        stripLeading$: () => string;
        cusomSplit: () => SplitObject;
        slugify: () => string;
        toRxDBType: () => JsonSchemaTypes;
        plural: () => Plural<string>;
    }
}
declare const _default_1: {
    String: StringConstructor;
};
export default _default_1;
