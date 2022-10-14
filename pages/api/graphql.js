import 'reflect-metadata';
import 'ts-tiny-invariant';
import { ApolloServer } from 'apollo-server-micro';
import 'cron/cron';
import Cors from 'micro-cors';
import { types } from 'graphql/types';
import { resolvers } from 'graphql/resolvers';
import processRequest from 'graphql-upload/processRequest.mjs';

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const functionHandler = async (req, res) => {
  const apolloServer = new ApolloServer({
    typeDefs: types,
    resolvers,
  });

  const contentType = req.headers['content-type'];
  if (contentType && contentType.startsWith('multipart/form-data')) {
    req.filePayload = await processRequest(req, res);
  }

  const startServer = apolloServer.start();
  await startServer;
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  return functionHandler(req, res);
});
