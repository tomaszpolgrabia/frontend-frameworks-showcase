const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:8123',
        changeOrigin: true,
        pathRewrite: {
            "^/api": ""
        },
        logLeve: "debug",
        secure: false
    }));
};
