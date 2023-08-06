import { User } from './user';
import { ValidateUserError } from '../consts/consts';

export interface UserDetailsCardSchema {
    data?: User;
    form?: User;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateUserError[];
}
