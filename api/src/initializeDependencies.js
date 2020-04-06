const NodeCache = require('node-cache');
const RedisCache = require('node-cache-redis');
const { defaultFieldResolver } = require('graphql');

const { Cache } = require('./infra');
const config = require('./config');

module.exports = () => {
  const dependencies = {
    infra: {},
    services: {},
    repositories: {},
    graphql: {},
  };

  if (config.REDIS_URL) {
    dependencies.infra.redisCache = new RedisCache({
      redisOptions: {
        url: config.REDIS_CACHE_URL,
      },
      ttlInSeconds: config.DEFAULT_CACHE_TTL,
    });
  }

  const cacheProvider = dependencies.redisCache
    || new NodeCache({ stdTTL: config.DEFAULT_CACHE_TTL });

  dependencies.infra.cache = Cache(cacheProvider);

  dependencies.graphql.defaultFieldResolver = defaultFieldResolver;
  return dependencies;
};
