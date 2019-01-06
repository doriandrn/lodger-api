import { JsonSchemaTypes } from "rxdb";
type SplitObject = {
    what: string;
    mutation: string;
};
declare global {
    /**
     * String helpers extensions
     *
     * @interface String
     */
    interface String {
        stripLeading$: () => string;
        spleet: () => SplitObject;
        slugify: () => string;
        toRxDBtype: () => JsonSchemaTypes;
    }
}
/**
 * Accepted 'string's for a LodgerSchema field
 *
 * @enum {number}
 */
declare enum strings {
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
declare enum numbers {
    date = 0,
    dateTime = 1,
    number = 2
}
/**
 * Accepted 'array's for a LodgerSchema field
 *
 * @enum {number}
 */
declare enum arrays {
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
declare enum objects {
    bani = 0,
    object = 1
}
export default String;
export { strings, numbers, arrays, objects };
