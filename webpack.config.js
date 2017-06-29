var path = require('path')
var webpack = require('webpack')

const cloudFrontConfig = {
    prod: 'daeenpsivztwq',
    stage: 'd1fidmk98tmsu2',
    dev: 'd2rgbs81ugg4wg'
}

function environment() {
    if (process.env.NODE_ENV !== 'local')
        return cloudFrontConfig[process.env.NODE_ENV];
}

module.exports = {
    entry: {
        personal: './src/personal/main'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: (process.env.NODE_ENV === 'local') ? '/dist/' : 'https://' + environment() + '.cloudfront.net/lt-yantr/dist/',
        filename: 'js/[name].build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ['css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: './images/[name].[ext]?[hash]'
                },
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    externals: {
        vue: "'vue'"
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'local')
                //NODE_ENV: process.env.NODE_ENV
            }
        })
    ]
}

if (process.env.NODE_ENV !== 'local') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true, 
        })
    ])
}