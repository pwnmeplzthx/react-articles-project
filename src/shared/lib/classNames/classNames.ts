// Функция для генеарции className 
// params: mainClass - главный класс, additional - дополнительные классы, mods - модификаторы (например {hoevered: true})
// return string

type Mods = Record<string, boolean | string>

export function classNames(mainClass: string, additional: string[], mods: Mods = {},): string {
    return [
        mainClass,
        ...additional,
        // Object.entries() - Полуаем ключи и значения у объекта, возвращает массив (в данном случае кортеж)
        ...Object.entries(mods)
            // Фильтруем только true элементы
            .filter(([key, value]) => Boolean(value))
            // Итерируемся по массиву и возвращаем ключи
            .map(([key]) => key)
    ].join(' ')
}