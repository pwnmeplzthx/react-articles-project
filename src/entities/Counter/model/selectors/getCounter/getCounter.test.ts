import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter', () => {
    // Проверяем, что возвращается нужная часть стейта
    test('should return counter value', () => {
        // Тип DeepPartial: нет необходимости вызывать весь стейт, со всеми обязательными полями, объявляем только часть стейта
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
