export enum ValidateCustomerError {
    INCORRECT_CUSTOMER_DATA = 'INCORRECT_CUSTOMER_DATA',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export enum CustomerView {
    BIG = 'BIG',
    SMALL = 'SMALL',
}

export enum CustomerSortField {
    CREATED = 'created_at',
    NAME = 'name',
    MODIFIED = 'modified_at',
    IS_CONFLICT = 'is_conflict',
    IS_REFUSENIC = 'is_refusenic',
}
