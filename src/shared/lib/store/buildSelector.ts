import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

// Тип для функции, которая получает стейт схему, и что-то возвращает из этого стейта
type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>]

// Используется для создания функций, возвращающих данные из стейта (чтобы не использовать каждый раз useSelector в компонентах)
export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = () => useSelector(selector);

    return [useSelectorHook, selector];
}
