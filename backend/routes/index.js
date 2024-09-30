const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const followerRoutes = require('./followerRoutes');
const metricRoutes = require('./metricRoutes');

module.exports = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/followers', followerRoutes);
  app.use('/api/metrics', metricRoutes);
};