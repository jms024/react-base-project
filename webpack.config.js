const path = require('path');

const DIR_NAME = path.resolve(__dirname);

const configDirs = {
    DIR_NAME : DIR_NAME,
    SRC_DIR  : DIR_NAME + '/src',
    BUILD_DIR: DIR_NAME + '/dist',
};

module.exports = (env) => {
    const configFile = {
        dev: './webpack/webpack-dev.js',
        test: './webpack/webpack-prod.js',
        prod: './webpack/webpack-prod.js',
    };

    if (configFile[env]) {
        return require (configFile[env])(env, configDirs);
    } else {
        console.log('Wrong webpack build parameter');
    }
};
