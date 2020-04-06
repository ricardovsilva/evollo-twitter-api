require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const initializeDependencies = require('./initializeDependencies');
const types = require('./types');
const resolvers = require('./resolvers');
const dataLoaders = require('./dataLoaders');
const { NODE_ENV } = require('./config');

const isProduction = NODE_ENV === 'production';
const typeDefs = [
  ...types,
];

const {
  services, graphql, repositories,
} = initializeDependencies();

const context = ({ req, res }) => ({
  request: req,
  mappedValues: {},
  response: res,
  dataLoaders: {
  },
  services,
  repositories,
  graphql,
});

const errorLogger = (error) => {
  console.error(error.message);
  return error;
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
  tracing: !isProduction,
  context,
  onHealthCheck: () =>
    new Promise(resolve => {
      resolve();
    }),
  formatError: errorLogger,
});

const running = ({ url }) => {
  console.info(`Server ready at ${url}`);
};

const runPromise = server.listen().then(running);

module.exports = {
  server,
  running,
  runPromise,
};
