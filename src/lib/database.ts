import MongoClient from 'mongodb';
import chalk from 'chalk';

class DataBase{
    async init(){
        const MONGO_DB = process.env.DATABASE || 'mongodb://localhost:27017/e-shop';
        const client = await MongoClient.connect(
            MONGO_DB,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const db = client.db();

        if(client.isConnected()){
            console.log('=========================DATABASE=====================');
            console.log(`STATUS: ${chalk.greenBright('ONLINE')}`)
            console.log(`DB: ${chalk.greenBright(db.databaseName)}`);
        }
    }
}

export default DataBase; // Para poder hacer uso de esta clase en el resto de la aplicacion