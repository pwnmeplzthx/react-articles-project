import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
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
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
    ];

    if (isDev) {
        plugins.push(
            // Обновление приложения без обновления страницы при внесении изменений
            new webpack.HotModuleReplacementPlugin(),
        );
        plugins.push(
            // Плагин для анализа размера бандла
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
        );
    }

    return plugins;
}
