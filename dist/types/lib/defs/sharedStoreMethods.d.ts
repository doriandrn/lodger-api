/**
 * @param {Object} { methodName: action }
 */
export declare type SharedStoreMethods = {
    [k: string]: string | undefined;
    selected?: string | undefined;
    last?: string | undefined;
};
export declare const sharedStoreMethods: SharedStoreMethods;
