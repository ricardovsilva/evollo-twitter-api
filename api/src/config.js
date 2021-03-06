const nonProductionEnvironment = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
};

module.exports = process.env.NODE_ENV === 'production' ? process.env : nonProductionEnvironment;
