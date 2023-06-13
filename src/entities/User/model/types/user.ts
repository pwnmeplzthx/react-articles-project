export interface User {
    id: string;
    username: string;
    avatar?: string;
}

export interface UserSchema {
    authData?: User;
    // Флаг инициализации данных о залогиненном юзере (для доступа на защищенные роуты)
    _isInitedAuthData: boolean;
}
