import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {

    // если не используется typescript - нужен babel-loader (перегоняет новый стандарт js в старый, чтобы все браузеры поддерживались)
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    return [
        typescriptLoader,
        cssLoader,
    ]
}