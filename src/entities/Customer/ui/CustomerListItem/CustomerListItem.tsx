import { HTMLAttributeAnchorTarget, memo } from 'react';
import { CustomerView } from '../../model/consts/consts';
import { Customer } from '../../model/types/customer';
import { CustomerListItemRedesigned } from './CustomerListItemRedesigned/CustomerListItemRedesigned';

export interface CustomerListItemProps {
    className?: string;
    customer: Customer;
    view: CustomerView;
    target?: HTMLAttributeAnchorTarget;
}

export const CustomerListItem = memo((props: CustomerListItemProps) => (
    <CustomerListItemRedesigned {...props} />
));
