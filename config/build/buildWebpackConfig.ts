import webpack from 'webpack';
import { buidDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolevrs';
import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        module: {
            // Конфигурируем лоадеры (предназначены для обработки файлов, которые выходят за рамки javascript)
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        // Показывает, в каком из исходных файлов (которые собираются в bandle) ошибка, не нужно на прод сборке
        devtool: isDev ? 'inline-source-map' : undefined,
        // Автоматическая пересброка после внесения изменений в файлы, на проде не нужна
        devServer: isDev ? buidDevServer(options) : undefined,
    };
}
