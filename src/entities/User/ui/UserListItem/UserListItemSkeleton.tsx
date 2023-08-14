import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './UserListItem.module.scss';
import { UserView } from '../../model/consts/consts';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface UserListItemSkeletonProps {
    className?: string;
    view: UserView;
}

export const UserListItemSkeleton = memo(
    (props: UserListItemSkeletonProps) => {
        const { className, view } = props;

        if (view === UserView.BIG) {
            return (
                <div
                    className={classNames(cls.UserListItemRedesigned, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card
                        border="round"
                        padding="24"
                    >
                        <div className={cls.header}>
                            <Skeleton border="50%" height={30} width={30} />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.username}
                            />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.date}
                            />
                        </div>
                        <Skeleton
                            width={250}
                            height={24}
                            className={cls.title}
                        />
                        <Skeleton height={200} className={cls.img} />
                        <div className={cls.footer}>
                            <Skeleton height={36} width={200} />
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div
                className={classNames(cls.UserListItemRedesigned, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card} border="round" padding="16">
                    <VStack gap="8" align="center" justify="center">
                        <div className={cls.imageWrapper}>
                            <Skeleton
                                width="100%"
                                height={140}
                            />
                        </div>
                        <Skeleton width="90%" height={16} />
                        <Skeleton width="80%" height={32} className={cls.title} />
                        <Skeleton width="90%" height={16} />
                        <Skeleton width="90%" height={16} />
                        <Skeleton width="90%" height={16} />
                    </VStack>
                </Card>
            </div>
        );
    },
);
