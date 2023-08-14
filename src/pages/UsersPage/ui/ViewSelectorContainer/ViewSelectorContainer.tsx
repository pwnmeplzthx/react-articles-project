import { memo } from 'react';
import { useUserFilters } from '../../lib/hooks/useUserFilters';
import { UserViewSelector } from '@/entities/User/ui/UserViewSelector/UserViewSelector';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;
        const { view, onChangeView } = useUserFilters();

        return (
            <UserViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);
