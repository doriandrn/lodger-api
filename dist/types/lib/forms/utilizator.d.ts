declare global {
    interface Utilizator {
        _id: string;
        nume?: string;
        contact?: DateContact;
        preferinte?: PreferinteUtilizator;
    }
}
declare const fields: FieldCreator[];
declare const plural = "utilizatori";
declare const methods: {
    UPDATEAZA(campuri: any): Promise<void>;
};
declare const settings: {
    online: {
        campuri: {
            id: string;
            required: boolean;
            encrypted: boolean;
        }[];
    };
};
export { fields, plural, methods, settings };
