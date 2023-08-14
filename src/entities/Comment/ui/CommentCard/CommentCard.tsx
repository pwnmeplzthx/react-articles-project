import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/app/providers/router/config/routeConfig';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={cls.username} />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <Card padding="24" border="round" max>
            <VStack
                data-testid="CommentCard.Content"
                gap="8"
                max
                className={classNames(cls.CommentCardRedesigned, [
                    className,
                ])}
            >
                <AppLink to={getRouteProfile(comment.user.id)}>
                    <HStack gap="8">
                        {comment.user.avatar ? (
                            <Avatar
                                size={30}
                                src={comment.user.avatar}
                            />
                        ) : null}
                        <Text text={comment.user.username} bold />
                    </HStack>
                </AppLink>
                <Text text={comment.text} />
            </VStack>
        </Card>
    );
});
