import { memo } from 'react';
import { useCustomerFilters } from '../../lib/hooks/useCustomerFilters';
import { CustomerViewSelector } from '@/entities/Customer/ui/CustomerViewSelector/CustomerViewSelector';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;
        const { view, onChangeView } = useCustomerFilters();

        return (
            <CustomerViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);
