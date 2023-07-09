export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
    WORKER = 'WORKER'
}

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}

export interface UserSchema {
    authData?: User;
    // Флаг инициализации данных о залогиненном юзере (для доступа на защищенные роуты)
    _isInitedAuthData: boolean;
}
