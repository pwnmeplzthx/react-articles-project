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
