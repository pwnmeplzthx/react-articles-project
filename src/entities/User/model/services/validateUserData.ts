import { User } from '@/entities/User';
import { ValidateUserError } from '../consts/consts';

export const validateUserData = (user?: User) => {
    if (!user) {
        return [ValidateUserError.NO_DATA];
    }

    const {
        avatar,
        name,
        surname,
        patronymic,
        phone,
        email,
        whatsapp,
        telegram,
        salary,
    } = user;

    const errors: ValidateUserError[] = [];

    if (!name || !surname) {
        errors.push(ValidateUserError.INCORRECT_USER_DATA);
    }

    return errors;
};
