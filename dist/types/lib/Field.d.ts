import { RxJsonSchemaTopLevel, RxDocument, JsonSchemaTypes } from "rxdb";
import { strings, numbers, arrays, objects } from './String';
declare type ReferenceTaxonomy = Plural<Taxonomie>;
declare type FieldGivenContext<T> = {
    selectedDoc?: RxDocument<T>;
    activeDoc: RxDocument<T>;
};
declare type FieldTypes = keyof typeof strings | keyof typeof numbers | keyof typeof arrays | keyof typeof objects | undefined;
declare global {
    type FieldCreator = {
        placeholder?: string;
        default?: any | Function;
        value?: (context?: FieldGivenContext<any>) => any;
        type?: FieldTypes;
        required?: boolean;
        encrypted?: boolean;
        index?: boolean;
        primary?: boolean;
        name?: string;
        options?: Array<any> | Object;
        step?: number;
        min?: number;
        max?: number;
        final?: boolean;
        v?: string;
        ref?: ReferenceTaxonomy;
        indexRef?: boolean;
        preview?: number;
        onclick?: {
            [method: string]: string;
        };
        oninput?: {
            [method: string]: string;
        };
        focus?: boolean;
    };
}
/**
 * @interface FieldAPI
 */
interface FieldAPI {
    readonly default: any | Function;
    readonly rxSchema: RxJsonSchemaTopLevel;
    readonly _type: FieldTypes;
    value(context?: FieldGivenContext<any>): any;
    onclick?: (context?: FieldGivenContext<any>) => void;
}
export declare type FieldsCreator<Schema> = {
    [i in Exclude<keyof Schema, ['_id', '@', 'upd@']>]: FieldCreator;
};
/**
 *
 * @class Form Field Item
 * @implements {SchemaField}
 * @requires [String]
 * @extends RxJsonSchemaTopLevel
 */
export declare class Field implements FieldAPI {
    readonly type: JsonSchemaTypes;
    readonly ref?: ReferenceTaxonomy;
    readonly items?: {
        type: 'string';
    };
    readonly multipleOf?: number;
    readonly v?: string;
    readonly storage?: 'db' | 'store';
    readonly default: any;
    readonly value: (context?: FieldGivenContext<any>) => any;
    readonly fakeValue: any;
    readonly preview?: number;
    readonly label?: string;
    readonly _type?: FieldTypes;
    readonly _index?: boolean;
    /**
     * Creates an instance of Field.
     *
     * @param {FieldCreator<T>} data
     * @memberof Field
     */
    constructor(data?: FieldCreator);
    /**
     * Used for Schema constructors,
     * returns only the properties needed for it
     */
    get rxSchema(): RxJsonSchemaTopLevel;
}
export {};
