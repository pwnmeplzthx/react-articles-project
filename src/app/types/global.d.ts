// https://scriptdev.ru/book/types/lib.d.ts/#string
// Необходим, чтобы явно опеределить тип, который должен импортироваться из файлов 
// ..name.module.css создана глобальная деклорация типов
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classnames: IClassNames;
    export = classnames;
}
