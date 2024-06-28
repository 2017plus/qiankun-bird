const webpack = require('webpack');
const { overrideDevServer  } = require('customize-cra');

const addDevServerConfig = () => config => {
    // 在这里写你自己的配置
    return {
        ...config,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    };
}

const webpackConfig = function override(config, env) {
    // 添加你的自定义配置...
    config.plugins.push(new webpack.DefinePlugin({
        'process.env.MY_ENV_VARIABLE': JSON.stringify('my-value'),
    }));
    config.output.libraryTarget = 'umd';
    config.output.library = 'bird-rlib'
    console.log(config);

    return config;
};

module.exports = {
    devServer: overrideDevServer(addDevServerConfig()),
    webpack: webpackConfig,
}