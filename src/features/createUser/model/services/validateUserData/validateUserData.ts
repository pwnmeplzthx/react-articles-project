import { User } from '@/entities/User';
import { ValidateUserError } from '@/entities/User/model/consts/consts';

export const validateUserData = (profile?: User) => {
    if (!profile) {
        return [ValidateUserError.NO_DATA];
    }

    const {
        name, username,
    } = profile;

    const errors: ValidateUserError[] = [];

    if (!name || !username) {
        errors.push(ValidateUserError.INCORRECT_USER_DATA);
    }

    return errors;
};
