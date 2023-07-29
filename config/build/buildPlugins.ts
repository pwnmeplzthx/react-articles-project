import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const isProd = !isDev;

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        // Прогресс сборки
        new webpack.ProgressPlugin(),
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
        // Аналог HotModuleReplacementPlugin, но работает лучше (не перезагружает страницу при смене css)
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(
            // Плагин для анализа размера бандла
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
        );
        // Отслеживает кольцевые зависимости, аналог - cruiser
        plugins.push(
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
            }),
        );
        // Проверка типов (передача пропсов) - без typescriptLoader не работает, поэтому устанавливается плагин
        plugins.push(new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }));
    }

    if (isProd) {
        // Этот плагин извлекает CSS в отдельные файлы. Он создает файл CSS для каждого файла JS, который содержит CSS. Он поддерживает загрузку по требованию CSS и SourceMaps.
        // https://webpack.js.org/plugins/mini-css-extract-plugin/
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
        // Копирование файлов перевода при прод сборке
        plugins.push(new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }));
    }

    return plugins;
}
