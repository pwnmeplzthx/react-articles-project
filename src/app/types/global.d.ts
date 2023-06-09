// Глобальные типы

// https://scriptdev.ru/book/types/lib.d.ts/#string
// Необходим, чтобы явно опеределить тип, который должен импортироваться из файлов
// ..name.module.css создана глобальная декларация типов
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classnames: IClassNames;
    export = classnames;
}

declare module '*.png'
declare module '*.jpe'
declare module '*.jpeg'

declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

// Декларация глобальной переменной из конфига (buildWebpackConfig.ts)
declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

// Тип Record с не обязательными полями
type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
