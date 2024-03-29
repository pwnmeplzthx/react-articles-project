import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

// Для устранения ошибки, связанной с импортами переопределяем конфиг для сторибука, который по-умолчанию
// уже настроен (те же самые проблемы, что и при настройке jest: абсолютные пути, scss)
export default ({ config }: {config: webpack.Configuration}) => {
    // Устраняем проблему с импортами
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: '',
    };
    config?.resolve?.modules?.push(paths.src);
    config?.resolve?.extensions?.push('.ts', '.tsx');
    config.resolve!.alias = { '@': paths.src };

    // устраняем проблему с svg
    if (config?.module?.rules) {
        // eslint-disable-next-line no-param-reassign
        config.module.rules = config?.module?.rules?.map((rule: RuleSetRule | '...') => {
            if (rule !== '...' && /svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i };
            }

            return rule;
        });
    }

    config?.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config?.module?.rules?.push({
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    });

    // Устраняем проблему с css modules
    config?.module?.rules?.push(buildCssLoader(true));

    // Другой вариант - гарантируем тайпскрипту, что поля не равны undefined
    // config!.plugins!.push(new DefinePlugin({
    config?.plugins?.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    return config;
};
