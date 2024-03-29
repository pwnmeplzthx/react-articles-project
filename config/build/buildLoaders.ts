import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    // если не используется typescript - нужен babel-loader (перегоняет новый стандарт js в старый, чтобы все браузеры поддерживались)
    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };

    const cssLoader = buildCssLoader(options.isDev);

    const svgLoader = {
        test: /\.svg$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            },
                        },
                    ],
                },
            },
        }],
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
    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    return [
        svgLoader,
        fileLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // babel loader должен отрабатывать раньше, чем typescriptLoader
        // typescriptLoader,
        cssLoader,
    ];
}
