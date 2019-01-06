import * as RxDB from 'rxdb';
/**
 * RxDB instantiator
 *
 * @export
 * @async
 * @param {RxDB.RxCollectionCreator[]} collections
 * @param {RxDB.RxDatabaseCreator} [config]
 * @returns {RxDB} the fresh database
 */
export default function (collections: RxDB.RxCollectionCreator[], config?: RxDB.RxDatabaseCreator): Promise<RxDB.RxDatabase<{
    [key: string]: RxDB.RxCollection<any, {}, {
        [key: string]: any;
    }>;
}>>;
