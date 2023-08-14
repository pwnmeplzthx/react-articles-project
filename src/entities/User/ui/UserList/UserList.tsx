import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { UserListItem } from '../UserListItem/UserListItem';
import cls from './UserList.module.scss';
import { User } from '../../model/types/user';
import { UserView } from '../../model/consts/consts';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { UserListItemSkeleton } from '../UserListItem/UserListItemSkeleton';

interface UserListProps {
    className?: string;
    users: User[]
    isLoading?: boolean;
    view?: UserView;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: UserView) => new Array(view === UserView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <UserListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const UserList = memo((props: UserListProps) => {
    const {
        className,
        users,
        view = UserView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();

    if (!isLoading && !users.length) {
        return (
            <div className={classNames(cls.userList, [className, cls[view]])}>
                <Text size="l" title={t('Пользователи не найдены')} />
            </div>
        );
    }

    return (
        <HStack
            wrap="wrap"
            gap="16"
            className={classNames(cls.UserListRedesigned)}
            data-testid="UserList"
        >
            {users.map((item) => (
                <UserListItem
                    user={item}
                    view={view}
                    target={target}
                    key={item.id}
                    className={cls.card}
                />
            ))}
            {isLoading && getSkeletons(view)}
        </HStack>
    );
});
