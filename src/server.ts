import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';
import environment from './config/environments';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema/index';
import expressPlayground from 'graphql-playground-middleware-express';
import DataBase from './lib/database';
import { IContext } from './interfaces/context.interface';

if(process.env.NODE_ENV !== 'production'){
    const env = environment;
    console.log(env);
}

async function init() {
    const app = express();

    app.use('*', cors());

    app.use(compression());

    const database = new DataBase(); // constante del objeto Base de datos

    const db = await database.init();

    const context = async({ req, connection }: IContext) => {
        const token = (req) ? req.headers.authorization : connection.authorization;
        return { db, token }
    };

    /**se crea servidor apollo con esquema desde schema/intex.ts */
    const server = new ApolloServer({
        schema: schema,
        introspection: true,
        context
    });

    /** se aplica el middleware de la aplicacion */
    server.applyMiddleware({
        app
    })

    app.get('/', expressPlayground({
        endpoint: '/graphql'
    }));

    const httpServer = createServer(app);
    const PORT = process.env.PORT;
    httpServer.listen(
        {
        port: PORT
        },
        () => console.log(`http://localhost:${PORT} Tienda On Line`)
    );
}
init();
