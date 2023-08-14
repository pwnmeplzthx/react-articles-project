import { HTMLAttributeAnchorTarget, memo } from 'react';
import { UserView } from '../../model/consts/consts';
import { User } from '../../model/types/user';
import { UserListItemRedesigned } from './UserListItemRedesigned/UserListItemRedesigned';

export interface UserListItemProps {
    className?: string;
    user: User;
    view: UserView;
    target?: HTMLAttributeAnchorTarget;
}

export const UserListItem = memo((props: UserListItemProps) => (
    <UserListItemRedesigned {...props} />
));
