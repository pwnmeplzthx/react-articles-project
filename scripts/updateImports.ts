// Скрипт анализирует аст дерево и исправляет все абсолютные пути (в данном случае добаляет использование алиаса @)
// Работает с библиотекой ts-morph

// Импортируем главный класс из библиотеки
import { Project } from 'ts-morph';

// Создаем инстанс класса
const project = new Project({});

// Добавляем файлы с исходным кодом, с которыми будем работать
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все файлы
const files = project.getSourceFiles();

// Проверка импорта, чтобы изменять только необходимое, и не трогать импорты библиотек
function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
    return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
    // Забираем импорты из файла
    const importDeclarations = sourceFile.getImportDeclarations();
    // Итерируемся по массиву найденных в файле импортов
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

// Обязательно делать сейв, чтобы тс морф применил изменения
project.save();
