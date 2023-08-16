export interface Customer {
    id: string;
    // ФИО
    name: string;
    // Номер телефона
    phone: string;
    // Источник клиента
    customer_source: string;
    email: string;
    // Конфликтный
    is_conflict: boolean;
    // Отказник
    is_refusenic: boolean;
    // Заметки
    notes: string;
    // Метка активности
    is_active: boolean;
    // Дата создания
    created_at: string;
    // Дата модификации
    modified_at: string;
    // Кем создано
    created_by: string;
    // Кем модифицировано
    modified_by: string;
}
