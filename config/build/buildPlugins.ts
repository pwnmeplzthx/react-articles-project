import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        // Прогресс сборки
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        // Прокидывание глобальных переменных (чтобы использовать в ts)
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
        // Обновление приложения без обновления страницы при внесении изменений
        new webpack.HotModuleReplacementPlugin(),

    ];
}
