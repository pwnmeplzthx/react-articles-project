import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    // если не используется typescript - нужен babel-loader (перегоняет новый стандарт js в старый, чтобы все браузеры поддерживались)
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const cssLoader = buildCssLoader(options.isDev);

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // Транспилятор, преобразующий код из одних стандартов в другие, если не используется typescriptLoader, тобабель обязателен
    // https://babeljs.io/docs/babel-preset-react
    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true,
                        },
                    ],
                ],
            },
        },
    };

    return [
        cssLoader,
        svgLoader,
        fileLoader,
        babelLoader,
        // babel loader должен отрабатывать раньше, чем typescriptLoader
        typescriptLoader,
    ];
}
