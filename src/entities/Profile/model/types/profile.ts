import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export interface Profile {
    first?: string;
    lastname?: string;
    age?: number,
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
}

export interface ProfileSchema {
    // Данные с бека
    data?: Profile;
    // Данные формы
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}
