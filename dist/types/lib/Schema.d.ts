import { RxJsonSchema, RxJsonSchemaTopLevel } from "rxdb";
import { LodgerFormCreator } from "./Form";
/**
 *
 *
 * @interface LodgerSchema
 */
interface LodgerSchema extends RxJsonSchema {
    addField(field: RxJsonSchemaTopLevel): void;
}
/**
 *
 *
 * @class Schema
 * @extends {RxJsonSchema}
 * @implements {LodgerSchema}
 */
export default class Schema implements LodgerSchema {
    title: string;
    properties: {};
    type: string;
    version: number;
    required: string[];
    /**
     * Constructs a valid RxJsonSchema out of a Lodger Form Data item
     *
     * @param {LodgerFormCreator} form
     * @param {boolean} [addCommonMethods]
     *
     * @memberof Schema
     * @returns {RxJsonSchema} schema
     */
    constructor(form: LodgerFormCreator, addCommonMethods?: boolean);
    /**
     *
     *
     * @param {FieldCreator} field
     * @memberof Schema
     */
    addField(field: RxJsonSchemaTopLevel): void;
}
export {};
