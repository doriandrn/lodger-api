type DistribuirePeApartamente = object;
type Distribuire = {
    mod: DistribuirePeApartamente;
    apartamente: Apartament[];
};
declare global {
    interface Factura {
        suma: Bani;
        nrFactura?: number;
        dataScadenta?: Date;
        distribuire?: Distribuire;
        furnizorId: string;
        asociatieId: string;
    }
}
declare const fields: FieldCreator<Factura>[];
declare const plural = "facturi";
export { fields, plural };
