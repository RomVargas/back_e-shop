import { Db } from "mongodb";

/**
 * 
 * @param database ->Base de datos en la que estamos trabajando
 * @param collection ->Coleccion a la que queremos buscar
 * @param sort ->Como queremos la ordenacion { <propiedad>: -1 }
 *  
 */
export const asignDocumentId = async(
    database: Db, 
    collection: string, 
    sort: object = {regisrDate: -1} 
) => {
     // Comporbar el ultimo usuario registardo para asignar ID
    const lastUser = await database
        .collection(collection)
        .find()
        .sort(sort)
        .toArray();
        console.log(lastUser);
    if (lastUser.length === 0 || lastUser === []) {
        return 1;
    }
    return lastUser[0].id + 1;
};

/**
 * @param database ->Base de datos en la que estamos trabajando
 * @param collection ->Coleccion a la que queremos buscar
 * @param filter -> filtro de busqueda
 */
export const findOneElement = async(
    database: Db,
    collection: string,
    filter: object
) => {
    return database
        .collection(collection)
        .findOne(filter);
}

/**
 * 
 * @param database ->Base de datos en la que estamos trabajando
 * @param collection ->Coleccion a la que queremos agregar
 * @param document -> Datos del usuario que vamos a agregar
 * @returns 
 */
export const insertOneElement = async(
    database: Db,
    collection: string,
    document: object
) => {
    return await database
    .collection(collection)
    .insertOne(document);
};

/**
 * 
 * @param database -> Base de datos en la que estamos trabajando
 * @param collection -> Coleccion a la que queremos agregar
 * @param documents -> Datos de los usuarios que vamos a agregar
 * @returns 
 */
export const insertManyElements = async(
    database: Db,
    collection: string,
    documents: Array<object>
) => {
    return await database
    .collection(collection)
    .insertMany(documents);
};

/**
 * 
 * @param database -> Base de datos en la que estamos trabajando
 * @param collection -> Coleccion a la que queremos buscar
 * @param filter -> filtro de busqueda
 * @returns 
 */
export const findElements = async(
    database: Db,
    collection: string,
    filter: object = {}
) => {
    return await database
    .collection(collection)
    .find(filter)
    .toArray();
};