module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8123',
                changeOrigin: false,
                secure: false,
                pathRewrite: {
                    "^/api": ""
                },
                logLevel: "debug"
            }
        }
    }
};
