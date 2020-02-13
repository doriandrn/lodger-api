declare const _default: {
    state: {
        open: boolean;
        content: null;
        data: null;
    };
    actions: {
        open: ({ commit }: {
            commit: any;
        }, content: any) => void;
        close: ({ commit, dispatch, getters, rootGetters }: {
            commit: any;
            dispatch: any;
            getters: any;
            rootGetters: any;
        }) => void;
    };
    mutations: {
        OPEN: (state: any, content: any) => void;
        DATA: (state: any, data: any) => void;
        CLOSE: (state: any) => void;
    };
    getters: {
        open: (state: any) => any;
        content: (state: any) => any;
        data: (state: any) => any;
    };
};
export default _default;
