const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', //backend 포트가 5000번이라서.
      changeOrigin: true,
    })
  );
};