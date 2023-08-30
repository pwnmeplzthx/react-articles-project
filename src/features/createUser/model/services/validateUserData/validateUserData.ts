import { Profile } from '@/entities/Profile';
import { ValidateUserError } from '@/entities/User/model/consts/consts';

export const validateUserData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateUserError.NO_DATA];
    }

    const {
        first, lastname, age, country,
    } = profile;

    const errors: ValidateUserError[] = [];

    if (!first || !lastname) {
        errors.push(ValidateUserError.INCORRECT_USER_DATA);
    }

    return errors;
};
