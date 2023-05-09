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

declare module "*.png"
declare module "*.jpe"
declare module "*.jpeg"

declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
