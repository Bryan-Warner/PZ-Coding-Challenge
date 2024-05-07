const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Specify the path you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:3000', // Specify the backend URL
      changeOrigin: true,
    })
  );
};
