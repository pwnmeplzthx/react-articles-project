import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/redesigned/Text';
import { getUsersPageError, getUsersPageIsLoading, getUsersPageView } from '../../model/selectors/usersPageSelectors';
import { UserList } from '@/entities/User/ui/UserList/UserList';
import { getUsers } from '../../model/slices/usersPageSlice';

interface UserInfiniteListProps {
    className?: string;
}

export const UserInfiniteList = memo((props: UserInfiniteListProps) => {
    const { className } = props;
    const users = useSelector(getUsers.selectAll);
    const isLoading = useSelector(getUsersPageIsLoading);
    const view = useSelector(getUsersPageView);
    const error = useSelector(getUsersPageError);
    const { t } = useTranslation();

    if (error) {
        return <Text text={t('Ошибка при загрузке статей')} />;
    }

    return (
        <UserList
            isLoading={isLoading}
            view={view}
            users={users}
            className={className}
        />
    );
});
