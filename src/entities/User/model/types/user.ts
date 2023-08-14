import { UserRole } from '../consts/consts';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    name?: string;
    surname?: string;
    patronymic?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    telegram?: string;
    // Зарплатная ставка
    salary?: number;
    // Процент от продажи запчасти
    sale_percent?: number;
    // Процент от ремонтных работ
    repair_percent?: number;
    // Процент за создание заказа
    create_order_percent?: number;
    // Процент за услуги
    service_percent?: number;
    // Кем создано
    created_by?: number;
    // Кем модифицировано
    modified_by?: number;
    // Дата создания
    created_at?: Date;
    // Дата модификации
    modified_at?: Date;
    user_icon?: string;
}

export interface UserSchema {
    authData?: User;
    // Флаг инициализации данных о залогиненном юзере (для доступа на защищенные роуты)
    _isInitedAuthData: boolean;
}
