const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js', // або './src/index.ts', якщо використовуєте TypeScript
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Очищує dist перед збіркою
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]', // Зберігає структуру папки
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'], // Для підтримки імпорту .ts та .js
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Ваш HTML файл
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'), // Вказує на папку assets у кореневій директорії
                    to: 'assets', // Копіює файли в dist/assets
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9001,
        open: true, // Автоматично відкриває браузер
    },
    mode: 'development',
};
