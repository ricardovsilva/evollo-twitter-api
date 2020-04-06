module.exports = (cacheProvider) => ({
  getOrSet: async (key, asyncFunc, ttl) => {
    let value = cacheProvider.get(key);
    if (value) {
      return value;
    }

    value = await asyncFunc();
    cacheProvider.set(key, value, ttl);
    return value;
  },
});
