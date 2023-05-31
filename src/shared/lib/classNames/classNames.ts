// Функция для генеарции className
// params: mainClass - главный класс, additional - дополнительные классы, mods - модификаторы (например {hoevered: true})
// return string

export type Mods = Record<string, boolean | string | undefined>

export function classNames(mainClass: string, additional: Array<string | undefined> = [], mods: Mods = {}): string {
    return [
        mainClass,
        ...additional.filter(Boolean),
        // Object.entries() - Полуаем ключи и значения у объекта, возвращает массив (в данном случае кортеж)
        ...Object.entries(mods)
            // Фильтруем только true элементы
            .filter(([key, value]) => Boolean(value))
            // Итерируемся по массиву и возвращаем ключи
            .map(([key]) => key),
    ].join(' ');
}
