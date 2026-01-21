import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import bodyParser from 'body-parser';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { AppDataSource } from './data-source';
import express from 'express';
import cors from 'cors';

async function start() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    try {
        await AppDataSource.initialize();
        console.log("✅ Data Source has been initialized!");
    } catch (err: any) {
        if (err.code === '3D000') {
            console.error(`❌ Error: Database "${process.env.DB_NAME}" does not exist. Please create it first.`);
        } else {
            console.error("❌ Error during Data Source initialization:", err.message || err);
        }
        throw err;
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        '/graphql',
        bodyParser.json(),
        expressMiddleware(server, {
            context: async () => ({}),
        }),
    );

    app.get('/health', (_req, res) => {
        res.json({ status: 'ok' });
    });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server ready at http://localhost:${port}/graphql`);
    });
}

start().catch((err) => {
    console.error(err);
});