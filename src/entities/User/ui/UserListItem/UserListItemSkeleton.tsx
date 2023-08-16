import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './UserListItem.module.scss';
import { UserView } from '../../model/consts/consts';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

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
                        <HStack align="start" max gap="16">
                            <div className={cls.avatarWrapper}>
                                <Skeleton height={150} width={150} />
                            </div>
                            <VStack className={cls.info} gap="16" max>
                                <VStack className={cls.info} gap="8" max>
                                    <Skeleton
                                        width="100%"
                                        height={24}
                                        className={cls.title}
                                    />
                                    <Skeleton
                                        width="50%"
                                        height={24}
                                        className={cls.title}
                                    />
                                </VStack>
                                <VStack className={cls.info} gap="8" max>
                                    <Skeleton
                                        width="100%"
                                        height={24}
                                        className={cls.username}
                                    />
                                    <Skeleton
                                        width="100%"
                                        height={24}
                                        className={cls.username}
                                    />
                                    <Skeleton
                                        width="100%"
                                        height={24}
                                        className={cls.username}
                                    />
                                    <Skeleton
                                        width="100%"
                                        height={24}
                                        className={cls.username}
                                    />
                                </VStack>
                                <VStack gap="4" className={cls.footer} max>
                                    <HStack max justify="end">
                                        <Skeleton height={50} width={120} />
                                    </HStack>
                                </VStack>
                            </VStack>
                        </HStack>
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
