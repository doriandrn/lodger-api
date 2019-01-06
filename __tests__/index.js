var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Lodger, Errors, Taxonomii } from '~/index';
import Debug from 'debug';
import { isRxDatabase } from 'rxdb';
import fakeData from '~/lib/helpers/dev/fakeData';
import BroadcastChannel from 'broadcast-channel';
import { predefinite } from '~/lib/forms/serviciu';
const taxonomii = Object.keys(Taxonomii);
const delay = (value) => new Promise(resolve => setTimeout(() => resolve(), value));
Debug.enable('lodger:*');
describe('Lodger', () => {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield BroadcastChannel.clearNodeFolder();
    }));
    describe('.build()', () => {
        let L;
        beforeAll(() => __awaiter(this, void 0, void 0, function* () {
            L = yield Lodger.build();
        }));
        describe('positive', () => {
            test('this is "run" in test environment', () => {
                expect(process.env.NODE_ENV).toBe('test');
            });
            test('.db = RxDatabase', () => __awaiter(this, void 0, void 0, function* () {
                expect(isRxDatabase(L.db)).toBeTruthy();
            }));
            test('.forms = object containing all forms based on tax', () => {
                expect(L.forms).toBeDefined();
                expect(typeof L.forms).toBe('object');
            });
            test('runs with no options / arguments', () => __awaiter(this, void 0, void 0, function* () {
                const lodger = yield Lodger.build();
                expect(lodger).toBeDefined();
                yield lodger.destroy();
            }));
            test('overwrites allowed build options', () => __awaiter(this, void 0, void 0, function* () {
                const options = {
                    dbCon: {
                        name: 'lodgerica' + new Date().getTime(),
                        adapter: 'memory'
                    }
                };
                const lodger = yield Lodger.build(options);
                expect(lodger).toBeDefined();
                yield lodger.destroy();
            }));
        });
        afterAll(() => __awaiter(this, void 0, void 0, function* () {
            yield L.destroy();
        }));
    });
    describe('.subscribe()', () => {
        let lodger;
        let debug;
        const tax = 'asociatie';
        const taxP = 'asociatii';
        beforeAll(() => __awaiter(this, void 0, void 0, function* () {
            lodger = yield Lodger.build();
            debug = Debug('lodger:test.subscribe');
        }));
        describe('positive', () => {
            test('it subscribes and gets content/data for a taxonomy', () => __awaiter(this, void 0, void 0, function* () {
                yield lodger.subscribe(tax);
                expect(lodger[taxP]()).toBeDefined();
            }));
            test('returns the subscriber for unsubscribing', () => __awaiter(this, void 0, void 0, function* () {
                const subscriberName = 'blabla';
                const unsubscribe = yield lodger.subscribe(tax, {}, subscriberName);
                const aTaxSub = unsubscribe['asociatii'];
                expect(typeof aTaxSub.unsubscribe).toBe('function');
            }));
            test('first init hook gets called only once', () => __awaiter(this, void 0, void 0, function* () {
                const taxToTest = 'utilizator';
                const pl = 'utilizatori';
                yield lodger.subscribe(taxToTest);
                yield delay(300);
                yield lodger.subscribe(taxToTest, null, 'xx');
                expect(lodger.subscribedTaxes).toContain(taxToTest);
                console.error(lodger.subscribedTaxes);
            }));
        });
        describe('negative', () => {
        });
        describe('First time subscribe behaviour', () => {
            describe('Predefined DB items', () => {
                describe('users', () => {
                    describe('positive', () => {
                        let adminId;
                        test('inserts admin on first sub', () => __awaiter(this, void 0, void 0, function* () {
                            yield lodger.subscribe('utilizator');
                            yield delay(300);
                            const utilizatori = lodger.utilizatori();
                            adminId = Object.keys(utilizatori)[0];
                            expect(adminId).toBeDefined();
                            expect(Object.keys(utilizatori)[1]).toBeUndefined();
                        }));
                        test('active utilizator/administrator = above inserted user', () => {
                            // console.error('wtf', lodger.getters['utilizator/activ'])
                            expect(lodger.getters['utilizator/activ']).toEqual(adminId);
                        });
                    });
                });
                describe('services', () => {
                    describe('positive', () => {
                        test('predefineds get inserted on first subscribe', () => __awaiter(this, void 0, void 0, function* () {
                            yield lodger.subscribe('serviciu');
                            yield delay(500);
                            const servicii = lodger.servicii();
                            expect(servicii).toBeDefined();
                            expect(Object.keys(servicii).length).toEqual(predefinite.length);
                        }));
                    });
                    describe('negative', () => {
                        test('predefineds dont get inserted on second subscribe', () => __awaiter(this, void 0, void 0, function* () {
                            yield lodger.subscribe('serviciu');
                            yield delay(500);
                            const servicii = lodger.servicii();
                            expect(servicii).toBeDefined();
                            expect(Object.keys(servicii).length).toEqual(predefinite.length);
                        }));
                        test('predefineds dont get inserted on another subscriber subscribe()', () => __awaiter(this, void 0, void 0, function* () {
                            yield lodger.subscribe('serviciu', null, 'coca');
                            yield delay(500);
                            const servicii = lodger.servicii('coca');
                            expect(servicii).toBeDefined();
                            expect(Object.keys(servicii).length).toEqual(predefinite.length);
                        }));
                    });
                });
            });
        });
        describe('Criteria', () => {
            const subName = 'criteriaTest';
            const tax = 'asociatie';
            const plural = 'asociatii';
            const limit = 2;
            beforeAll(() => __awaiter(this, void 0, void 0, function* () {
                for (let i of Array(limit * 3).keys()) {
                    const { _id } = yield lodger.put(tax, fakeData(tax));
                    console.error('i', _id);
                    yield delay(10);
                }
                yield delay(1500);
            }));
            describe('positive', () => {
                test('limits the items', () => __awaiter(this, void 0, void 0, function* () {
                    const criteriu = { limit };
                    const sub = yield lodger.subscribe(tax, criteriu, subName);
                    yield delay(200);
                    const items = lodger[plural](subName);
                    expect(Object.keys(items).length).toEqual(limit);
                    yield sub[plural].unsubscribe();
                }));
                test('loads more items with given index', () => __awaiter(this, void 0, void 0, function* () {
                    const criteriu = { limit, index: limit * 2 };
                    const sub = yield lodger.subscribe(tax, criteriu, subName);
                    yield delay(200);
                    const items = lodger[plural](subName);
                    expect(Object.keys(items).length).toEqual(limit * 3);
                    yield sub[plural].unsubscribe();
                }));
            });
            describe('Sort', () => {
                describe('positive', () => {
                    test('name - AZ (+limit)', () => __awaiter(this, void 0, void 0, function* () {
                        const limit = 5;
                        const sort = { name: 1 };
                        const criteriu = { limit, sort };
                        const sub = yield lodger.subscribe(tax, criteriu, subName);
                        yield delay(200);
                        const items = lodger[plural](subName);
                        // expect(Object.keys(items).length).toEqual(limit*3)
                        expect(Object.values(items).map(item => item.name))
                            .toEqual(expect.arrayContaining(Object.values(items).map(i => i.name).sort()));
                        yield sub[plural].unsubscribe();
                    }));
                });
            });
        });
        describe('Multiple Taxonomies behaviour', () => {
            const subName = 'multipleTaxes';
            const multipleTaxes = [`${tax}`, 'apartament', 'bloc'];
            let unsubMultipleTaxes;
            let forms;
            beforeAll(() => {
                forms = lodger.forms;
            });
            test('it subscribes multiple taxonomies at once', () => __awaiter(this, void 0, void 0, function* () {
                unsubMultipleTaxes = yield lodger.subscribe(multipleTaxes, undefined, subName);
                expect(lodger.asociatii(subName)).toBeDefined();
            }));
            test('keys length is equal in both cases', () => {
                expect(Object.keys(unsubMultipleTaxes).length).toEqual(multipleTaxes.length);
            });
            test('unsubscriber is created ok for all taxes', () => __awaiter(this, void 0, void 0, function* () {
                const pluralsMultipleTaxes = multipleTaxes
                    .map(tx => forms[tx].plural);
                expect(pluralsMultipleTaxes).toEqual(Object.keys(unsubMultipleTaxes));
            }));
            test('unsubscribes all taxonomies and data gets wiped from dataHolder', (done) => __awaiter(this, void 0, void 0, function* () {
                const pluralsMultipleTaxes = multipleTaxes
                    .map(tx => forms[tx].plural);
                expect.assertions(pluralsMultipleTaxes.length);
                yield Promise.all(Object.keys(unsubMultipleTaxes)
                    .map((taxToUnsub) => __awaiter(this, void 0, void 0, function* () {
                    yield unsubMultipleTaxes[taxToUnsub].unsubscribe();
                    expect(unsubMultipleTaxes[taxToUnsub].closed).toBeTruthy();
                    // expect(lodger[pluralsMultipleTaxes[unsubMultipleTaxes[taxToUnsub]]](subName)).toBeUndefined()
                })));
                done();
            }));
        });
        describe('Custom Subscriber behaviour', () => {
            let subscriberName;
            beforeAll(() => __awaiter(this, void 0, void 0, function* () {
                subscriberName = 'asub';
                yield lodger.subscribe('asociatie', {}, subscriberName);
            }));
            describe('positive', () => {
                test('it creates a new subscriber from given subscriberName (3rd arg)', () => __awaiter(this, void 0, void 0, function* () {
                    const asocs = yield lodger.asociatii(subscriberName);
                    expect(asocs).toBeDefined();
                }));
                test('when a new item is created, dataholder has it', (done) => __awaiter(this, void 0, void 0, function* () {
                    const { _id } = yield lodger.put('asociatie', fakeData('asociatie'), subscriberName);
                    expect.assertions(1);
                    // give rxdb some lil' time to update entries
                    setTimeout(() => {
                        const asocs = lodger.asociatii(subscriberName);
                        expect(asocs[_id]).toBeDefined();
                        done();
                    }, 500);
                }), 600);
            });
        });
        describe('Unsubscribe behaviour', () => { });
        afterAll(() => __awaiter(this, void 0, void 0, function* () {
            yield lodger.destroy();
        }));
    });
    describe('Public API', () => __awaiter(this, void 0, void 0, function* () {
        let lodger;
        let getters;
        beforeAll(() => __awaiter(this, void 0, void 0, function* () {
            lodger = yield Lodger.build();
        }));
        let commonId = null;
        describe('.put()', () => {
            const debug = Debug('lodger:tests:put');
            const testTax = 'asociatie';
            describe(`positive [${testTax}]`, () => {
                let asoc;
                const moneda = 'ron';
                beforeAll(() => __awaiter(this, void 0, void 0, function* () {
                    const name = 'bla';
                    try {
                        asoc = yield lodger.put(testTax, {
                            name,
                            moneda
                        });
                    }
                    catch (e) {
                        debug('PUT FAILED', e);
                    }
                }));
                test('item gets added ok', () => {
                    expect(asoc).toBeDefined();
                });
                test('item is assigned an _id', () => {
                    const { _id } = asoc;
                    expect(_id).toBeDefined();
                });
                test(`getter 'asociatie/last' is the item's id`, () => {
                    const { _id } = asoc;
                    const lastAddedId = lodger.getters['asociatie/last'];
                    expect(lastAddedId).toBe(_id);
                });
                test('item gets selected immediately after', () => {
                    const { _id } = asoc;
                    expect(lodger.getters['asociatie/selected']).toBe(_id);
                });
                test('updates the current item if _id is provided and ok', () => __awaiter(this, void 0, void 0, function* () {
                    const asocnew = Object.assign({}, {
                        _id: asoc._id,
                        name: 'New aso',
                        moneda
                    });
                    const { _id } = yield lodger.put(testTax, asocnew);
                    expect(_id).toEqual(asoc._id);
                }));
            });
            describe('negative', () => {
                test('throws if no data is supplied', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield lodger.put('asociatie', {});
                    }
                    catch (e) {
                        expect(e).toBeDefined();
                        expect(String(e).indexOf('data')).toBeTruthy();
                    }
                }));
                test('throws if wrong/unknown taxonomy', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield lodger.put('masina', { name: 'Honda' });
                    }
                    catch (e) {
                        expect(e).toBeDefined();
                    }
                }));
                test('throws if data doesnt match schema', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield lodger.put('asociatie', { lol: 'fool' });
                    }
                    catch (e) {
                        expect(e).toBeDefined();
                    }
                }));
            });
            // test('adds a new bloc at prev created assoc', async () => {
            // })
        });
        describe('.trash()', () => {
            test('deletes the prev added assoc', () => {
                expect(() => __awaiter(this, void 0, void 0, function* () { yield lodger.trash('asociatie', commonId); })).not.toThrow();
                // expect(getters['asociatie/ids']).not.toContain(commonId)
            });
        });
        describe('.select()', () => {
            let testerId;
            const tax = 'asociatie';
            const gn = `${tax}/selected`;
            let g;
            /**
             * Adaugam 5 asociatii sa avem 5 id-uri cu care sa ne jucam :)
             */
            beforeAll(() => __awaiter(this, void 0, void 0, function* () {
                const ns = 4;
                for (let i of Array(ns).keys()) {
                    const { _id } = yield lodger.put(tax, fakeData(tax));
                    if (i === 3)
                        testerId = _id;
                }
                g = lodger.getters;
            }));
            describe('positive', () => {
                test('selects ok an item by it\'s id', () => __awaiter(this, void 0, void 0, function* () {
                    yield lodger.select(tax, testerId);
                    expect(g[gn]).toEqual(testerId);
                }));
                test('cannot select the same item again', () => __awaiter(this, void 0, void 0, function* () {
                    const selected = yield lodger.select(tax, testerId);
                    expect(selected).toBeUndefined();
                }));
                test('deselects an item if NULL is given as 2nd arg', () => __awaiter(this, void 0, void 0, function* () {
                    yield lodger.select(tax, null);
                    expect(g[gn]).toBeFalsy();
                }));
                test('accepts an OBJECT (with id) as 2nd arg', () => __awaiter(this, void 0, void 0, function* () {
                    yield lodger.select(tax, {
                        id: testerId
                    });
                    expect(g[gn]).toBe(testerId);
                }));
                test('updates dependend taxonomies when smh gets selected', () => {
                });
            });
            describe('negative', () => {
                test('throws if taxonomy does not exist', () => {
                    try {
                        lodger.select('masina', 'abc123');
                    }
                    catch (e) {
                        expect(e).toBeDefined();
                    }
                });
                test(`does NOT deselect the item if ID does not exist or wrong supplied`, () => __awaiter(this, void 0, void 0, function* () {
                    const curSelectedId = g[gn];
                    yield lodger.select(tax, 'bla');
                    expect(g[gn]).toBe(curSelectedId);
                    yield lodger.select(tax, '');
                    expect(g[gn]).toBe(curSelectedId);
                }));
            });
        });
        describe('.[taxonomy]() getters', () => {
            // beforeEach(async () => {
            //   await delay(2500)
            // })
            let forms;
            const subName = 'test';
            beforeAll(() => {
                taxonomii.map((tax) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        lodger.subscribe(tax, null, subName);
                        yield lodger.put(tax, fakeData(tax));
                        yield delay(500); //give rxdb time to update the changes
                    }
                    catch (e) {
                        console.error(e);
                    }
                }));
                forms = lodger.forms;
            });
            describe('positive', () => {
                taxonomii.map(tax => {
                    test(`${tax} is defined`, () => __awaiter(this, void 0, void 0, function* () {
                        const { plural } = forms[tax];
                        yield delay(100);
                        expect(lodger[`${plural}`](subName)).toBeDefined();
                    }));
                    test(`${tax} item matches schema`, () => __awaiter(this, void 0, void 0, function* () {
                        const { plural, schema: { properties } } = forms[tax];
                        yield delay(100);
                        const items = lodger[`${plural}`](subName);
                        const allSchemaKeys = Object.keys(properties);
                        const oneItem = Object.keys(items)[0];
                        const containingItems = Object.keys(items[oneItem])
                            .filter(item => ['_id', '_rev'].indexOf(item) < 0);
                        expect(allSchemaKeys).toEqual(expect.arrayContaining(containingItems));
                    }));
                });
                test('returns the items of another sub', () => __awaiter(this, void 0, void 0, function* () {
                    const subName = 'listeDePlata';
                    yield lodger.subscribe('apartament', undefined, subName);
                    yield delay(500);
                    expect(lodger.apartamente(subName)).toBeDefined();
                }));
            });
            describe('negative', () => {
                test('throws if subscriber supplied doesnt exist', () => {
                    try {
                        const aps = lodger.apartamente('subInexistent');
                    }
                    catch (e) {
                        expect(e).toBeDefined();
                    }
                });
            });
        });
        describe('.export()', () => {
            describe('positive', () => {
                test('it exports with no path given in downloads folder', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield lodger.export();
                    }
                    catch (e) {
                        expect(e).toBeUndefined();
                    }
                }));
            });
            describe('negative', () => {
                test('it fails if wrong path is supplied', () => {
                    try {
                        lodger.export('xx/xx');
                    }
                    catch (e) {
                        expect(e).toBeDefined();
                    }
                });
            });
        });
        describe('.search()', () => {
        });
        describe('.setPreference()', () => {
            describe('positive', () => {
                test('sets a new preferences value in store', () => __awaiter(this, void 0, void 0, function* () {
                    yield lodger.setPreference('client.interface.fontSize', 3);
                    expect(lodger.preferences.client.fontSize).toBe(3);
                }));
                test('sets a new preferences value in DB', () => __awaiter(this, void 0, void 0, function* () {
                    yield lodger.setPreference('user.language', 'ro');
                    expect(lodger.preferences.user.language).toBe('ro');
                }));
            });
            describe('negative', () => {
                test('throws if starting taxonomy is not known', () => __awaiter(this, void 0, void 0, function* () {
                    // expect(async () => { await lodger.setPreference('caca.maca', null) }).toThrow()
                    try {
                        yield lodger.setPreference('caca.maca', null);
                    }
                    catch (e) {
                        expect(e).toBeDefined();
                        expect(String(e).indexOf(Errors.invalidPreferenceIndex)).toBeTruthy();
                    }
                }));
                test('throws if invalid properties specified', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield lodger.setPreference('client.', null);
                    }
                    catch (e) {
                        expect(String(e).indexOf(Errors.invalidPropertySupplied)).toBeTruthy();
                    }
                    try {
                        yield lodger.setPreference('client.xxx', 0);
                    }
                    catch (e) {
                        expect(String(e).indexOf(Errors.invalidPropertySupplied)).toBeTruthy();
                    }
                }));
            });
        });
        describe('.subscriberData getter', () => {
            describe('positive', () => {
                test('it creates the requested dummy objected if it s not defined in subsData', () => {
                    const data = lodger.subscriberData('asociatie', 'subscriber');
                    expect(data).toBeDefined();
                    expect(data.items).toBeDefined();
                });
                test('returns empty if not defined', () => {
                    const data = lodger.subscriberData('blabla', 'subscriber');
                    expect(data).toBeDefined();
                    expect(data.items).toBeDefined();
                });
                test('', () => {
                });
            });
            describe('negative', () => {
            });
        });
        afterAll(() => __awaiter(this, void 0, void 0, function* () {
            if (!lodger)
                return;
            yield lodger.destroy();
        }));
    }));
});
//# sourceMappingURL=index.js.map