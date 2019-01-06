declare global {
    interface Contor {
        tip: string;
    }
}
declare const fields: FieldCreator<Contor>[];
export { fields };
