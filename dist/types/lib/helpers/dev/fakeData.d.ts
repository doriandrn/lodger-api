import { Taxonomii } from "../../../index";
export default function fakeData(taxonomy: Taxonomii): {
    name: string;
    moneda: string;
    balanta: number;
    nr?: undefined;
    proprietar?: undefined;
    etaj?: undefined;
    scara?: undefined;
    suprafata?: undefined;
    locatari?: undefined;
    suma?: undefined;
    nrChitanta?: undefined;
    nrFactura?: undefined;
    dataScadenta?: undefined;
    servicii?: undefined;
    denumire?: undefined;
    rol?: undefined;
} | {
    name: string;
    moneda?: undefined;
    balanta?: undefined;
    nr?: undefined;
    proprietar?: undefined;
    etaj?: undefined;
    scara?: undefined;
    suprafata?: undefined;
    locatari?: undefined;
    suma?: undefined;
    nrChitanta?: undefined;
    nrFactura?: undefined;
    dataScadenta?: undefined;
    servicii?: undefined;
    denumire?: undefined;
    rol?: undefined;
} | {
    nr: number;
    proprietar: string;
    etaj: number;
    scara: number;
    balanta: number;
    suprafata: number;
    locatari: number;
    name?: undefined;
    moneda?: undefined;
    suma?: undefined;
    nrChitanta?: undefined;
    nrFactura?: undefined;
    dataScadenta?: undefined;
    servicii?: undefined;
    denumire?: undefined;
    rol?: undefined;
} | {
    moneda: string;
    suma: number;
    nrChitanta: number;
    name?: undefined;
    balanta?: undefined;
    nr?: undefined;
    proprietar?: undefined;
    etaj?: undefined;
    scara?: undefined;
    suprafata?: undefined;
    locatari?: undefined;
    nrFactura?: undefined;
    dataScadenta?: undefined;
    servicii?: undefined;
    denumire?: undefined;
    rol?: undefined;
} | {
    nrFactura: number;
    suma: number;
    moneda: string;
    dataScadenta: number;
    name?: undefined;
    balanta?: undefined;
    nr?: undefined;
    proprietar?: undefined;
    etaj?: undefined;
    scara?: undefined;
    suprafata?: undefined;
    locatari?: undefined;
    nrChitanta?: undefined;
    servicii?: undefined;
    denumire?: undefined;
    rol?: undefined;
} | {
    name: string;
    servicii: never[];
    moneda?: undefined;
    balanta?: undefined;
    nr?: undefined;
    proprietar?: undefined;
    etaj?: undefined;
    scara?: undefined;
    suprafata?: undefined;
    locatari?: undefined;
    suma?: undefined;
    nrChitanta?: undefined;
    nrFactura?: undefined;
    dataScadenta?: undefined;
    denumire?: undefined;
    rol?: undefined;
} | {
    denumire: string;
    name?: undefined;
    moneda?: undefined;
    balanta?: undefined;
    nr?: undefined;
    proprietar?: undefined;
    etaj?: undefined;
    scara?: undefined;
    suprafata?: undefined;
    locatari?: undefined;
    suma?: undefined;
    nrChitanta?: undefined;
    nrFactura?: undefined;
    dataScadenta?: undefined;
    servicii?: undefined;
    rol?: undefined;
} | {
    moneda: string;
    suma: number;
    name?: undefined;
    balanta?: undefined;
    nr?: undefined;
    proprietar?: undefined;
    etaj?: undefined;
    scara?: undefined;
    suprafata?: undefined;
    locatari?: undefined;
    nrChitanta?: undefined;
    nrFactura?: undefined;
    dataScadenta?: undefined;
    servicii?: undefined;
    denumire?: undefined;
    rol?: undefined;
} | {
    name: string;
    rol: string;
    moneda?: undefined;
    balanta?: undefined;
    nr?: undefined;
    proprietar?: undefined;
    etaj?: undefined;
    scara?: undefined;
    suprafata?: undefined;
    locatari?: undefined;
    suma?: undefined;
    nrChitanta?: undefined;
    nrFactura?: undefined;
    dataScadenta?: undefined;
    servicii?: undefined;
    denumire?: undefined;
} | undefined;
