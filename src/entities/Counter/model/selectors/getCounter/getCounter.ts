import { StateSchema } from 'app/providers/StoreProvider';

// Возвращает весь стейт
export const getCounter = (state: StateSchema) => state.counter;
