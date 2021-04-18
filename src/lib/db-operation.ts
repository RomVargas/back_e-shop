import { Db } from "mongodb";

/**
 * 
 * @param database //Base de datos en la que estamos trabajando
 * @param collection //Coleccion a la que queremos buscar
 * @param sort //Como queremos la ordenacion { <propiedad>: -1 }
 * @returns 
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