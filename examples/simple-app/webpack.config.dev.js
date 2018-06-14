// Copyright (c) 2018 Ultimaker B.V.
const base = require('../../webpack.config.dev.js');

const DEV_BASE_DIR = path.resolve(__dirname, 'app/dev');


module.exports = merge(base, {
    devServer: {
        contentBase: DEV_BASE_DIR,
        host: '127.0.0.1',
        port: 8000,
        historyApiFallback: true,
        proxy: [
            {
                target: 'http://127.0.0.1:5000',
                secure: false
            }
        ]
    },
})
