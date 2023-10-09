export interface Role {
    id: string;
    // Наименование роли
    name: string;
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
