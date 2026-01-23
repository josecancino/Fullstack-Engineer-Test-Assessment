import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
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
    console.log('✅ Data Source has been initialized!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Error during Data Source initialization:', error.message);
    } else {
      console.error('❌ Unknown error during Data Source initialization:', error);
    }
    throw error;
  }

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, { context: async () => ({}) })
  );

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}/graphql`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
