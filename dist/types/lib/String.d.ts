import { JsonSchemaTypes } from "rxdb";
/**
 * Accepted -strings- for a LodgerSchema field's type
 *
 * @enum {number}
 */
export declare enum strings {
    $ = 0,
    buildingName = 1,
    fullName = 2,
    search = 3,
    select = 4,
    serviceName = 5,
    string = 6,
    textarea = 7,
    userAvatar = 8
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
    object = 0,
    organizatie = 1
}
declare global {
    /**
     * String helpers extensions
     *
     * @interface String
     */
    interface String {
        stripLeading: (symbol: string) => String;
        slug: string;
        plural: Plural<string>;
        asMoney: Money;
        asRxDBType: JsonSchemaTypes;
    }
}
declare const _default_1: {
    String: StringConstructor;
};
export default _default_1;
