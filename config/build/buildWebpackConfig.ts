import webpack from "webpack";
import { BuildOptions } from "./types/config";
import path from "path";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolevrs";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

    const {mode, paths} = options

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            // Конфигурируем лоадеры (предназначены для обработки файлов, которые выходят за рамки javascript)
            rules: buildLoaders(),
        },
        resolve: buildResolvers(),
    }
}