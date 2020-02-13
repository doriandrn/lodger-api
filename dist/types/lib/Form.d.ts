import { Field, FieldsCreator } from './Field';
import Schema from './Schema';
declare type FormOptions = {
    captureTimestamp?: boolean;
};
declare type FormFields<I> = {
    [k in keyof I]: Field;
};
export declare type LodgerFormCreator<T> = {
    name: string;
    plural?: Plural<String>;
    fields?: FieldsCreator<T>;
};
/**
 * Errors Definition
 * @readonly
 * @enum {string}
 *
 * @todo account for translations
 */
declare enum Errors {
    invalidRequested = "Invalid file requested: %%",
    invalidName = "Invalid name supplied: %%",
    missingFields = "Missing fields on form %%"
}
/**
 *
 * @interface LodgerForm
 */
interface FormAPI<I> {
    $active: boolean;
    value(newForm: boolean): FormValue<I>;
}
declare type FormValue<I> = {
    [k in keyof I]?: any;
};
/**
 * Lodder Form class
 *
 * @class Form
 * @implements {LodgerForm}
 */
declare class Form<I> implements FormAPI<I> {
    protected opts?: FormOptions | undefined;
    private _onsubmit;
    readonly name: string;
    readonly plural: string;
    readonly schema: Schema<string, I>;
    $active: boolean;
    readonly fields: FormFields<I>;
    /**
     * Creates an instance of Form.
     *
     * @param {LodgerFormCreator} data - Form input data
     * @param {boolean} [generateRxCollection=true] - some forms don't require this
     *
     * @memberof Form
     */
    constructor(data?: LodgerFormCreator<I>, opts?: FormOptions | undefined);
    /**
     * Makes a Vue-ready $data {object} suitable to be completed
     * by the user in the frontend -> new form
     * (as it will turn reactive)
     *
     * @readonly
     * @memberof Form
     * @returns {Object}
     */
    readonly data: any;
    /**
     * Quick access to all fields' ids
     *
     * @readonly
     * @memberof Form
     * @returns {string[]}
     */
    readonly fieldsIds: string[];
    /**
     * register a new onsubmit function
     *
     * @memberof Form
     */
    onsubmit: Function;
    /**
     * Gets the value of current active form
     *
     * @summary for new forms, values are all undefined
     * @returns {Object} data item (Vue $data - ready)
     */
    value(context?: any): FormValue<I>;
}
export { Form, Errors };
