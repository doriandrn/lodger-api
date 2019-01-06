import Vuex, { ModuleTree, Module, StoreOptions } from 'vuex';
export declare type Locale = 'en' | 'ro';
export interface RootState {
    version: string;
    locale: Locale;
}
export declare const customOpts: (context: any, options: StoreOptions<RootState>) => StoreOptions<RootState> | undefined;
export default class LodgerStore extends Vuex.Store<RootState> {
    readonly context: any;
    readonly options: {};
    readonly modules: ModuleTree<any>;
    constructor(context: any, options?: {});
    /**
     * Use a store module
     * to be used before calling the constructor
     *
     * @param module
     * @param {Boolean} namespaced - if it should be namespaced
     */
    static use(module: {
        [k: string]: Module<any, RootState>;
    }, namespaced?: boolean): void;
}
