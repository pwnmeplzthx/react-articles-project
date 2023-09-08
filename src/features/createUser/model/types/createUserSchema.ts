import { User } from '@/entities/User';
import { ValidateUserError } from '@/entities/User/model/consts/consts';

export interface CreateUserSchema {
    validateErrors?: ValidateUserError[];
    data?: User;
    isLoading: boolean;
    error?: string;
}
