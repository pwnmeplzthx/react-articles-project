export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
    WORKER = 'WORKER'
}

export enum ValidateUserError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export enum UserView {
    BIG = 'BIG',
    SMALL = 'SMALL',
}

export enum UserSortField {
    CREATED = 'created_at',
    SALARY = 'salary',
    NAME = 'name',
    SURNAME = 'surname',
}
