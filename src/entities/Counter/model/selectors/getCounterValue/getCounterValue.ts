import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';
import { CounterSchema } from '../../types/counterSchema';
import { buildSelector } from '@/shared/lib/store';

// Возвращает конкретное значение из стейта

// Функция createSelector позволяет переиспользовать другие селекторы
// Мемоизирует значения аналогично useMemo
// https://github.com/reduxjs/reselect
// export const getCounterValue = createSelector(
//     getCounter,
//     (counter: CounterSchema) => counter.value,
// );

// аналогичный функционал, с использованием buildSelector
export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
);
