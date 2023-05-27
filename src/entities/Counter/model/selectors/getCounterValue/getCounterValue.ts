import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';
import { CounterSchema } from '../../types/counterSchema';

// Возвращает конкретное значение из стейта

// Функция createSelector позволяет переиспользовать другие селекторы
// Мемоизирует значения аналогично useMemo
// https://github.com/reduxjs/reselect
export const getCounterValue = createSelector(
    getCounter,
    (counter: CounterSchema) => counter.value,
);
