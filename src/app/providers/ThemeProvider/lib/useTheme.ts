import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    changeTheme: (theme: Theme) => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        let newTheme: Theme;
        // const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.DARK;
            break;
        // case Theme.LIGHT:
        //     newTheme = Theme.KANAGAWA;
        //     break;
        // case Theme.VIOLET:
        //     newTheme = Theme.DARK;
        //     break;
        default:
            newTheme = Theme.LIGHT;
        }
        // Функция ssetTheme может быть пустой, потому что контекст инициализируется не сразу (проверяем функцию с помощью ?.)
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    const changeTheme = (newTheme: Theme) => {
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme: theme || Theme.LIGHT, toggleTheme, changeTheme };
}
