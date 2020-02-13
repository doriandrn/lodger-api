declare const _default: {
    state: () => {
        _happened: boolean;
        type: null;
        message: null;
    };
    actions: {
        confirm: ({ commit, dispatch }: {
            commit: any;
            dispatch: any;
        }) => void;
        new: ({ commit, dispatch }: {
            commit: any;
            dispatch: any;
        }, prompt: any) => void;
        cancel: ({ commit }: {
            commit: any;
        }) => void;
    };
    mutations: {
        PROMPT: (state: any, { type, message }: {
            type: any;
            message: any;
        }) => void;
        PROMPT_OK: (state: any) => void;
        PROMPT_CANCEL: (state: any) => void;
    };
    getters: {
        type: (state: any) => any;
        message: (state: any) => any;
        prompted: (state: any) => any;
    };
};
export default _default;
