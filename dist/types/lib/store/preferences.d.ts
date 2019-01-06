import { Module } from 'vuex';
/**
 * Preferences MODULE
 */
declare type PreferencesState = {
    theme: string;
    [k: string]: any;
};
declare const _default: Module<PreferencesState, any>;
export default _default;
