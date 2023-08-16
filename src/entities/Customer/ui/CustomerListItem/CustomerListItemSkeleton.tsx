import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './CustomerListItem.module.scss';
import { CustomerView } from '../../model/consts/consts';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface CustomerListItemSkeletonProps {
    className?: string;
    view: CustomerView;
}

export const CustomerListItemSkeleton = memo(
    (props: CustomerListItemSkeletonProps) => {
        const { className, view } = props;

        if (view === CustomerView.BIG) {
            return (
                <div
                    className={classNames(cls.CustomerListItemRedesigned, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card
                        border="round"
                        padding="24"
                    >
                        <VStack className={cls.info} gap="24" max>
                            <Skeleton
                                width="100%"
                                height={32}
                                className={cls.title}
                            />
                            <Skeleton height={24} width="100%" className={cls.username} />
                            <Skeleton height={24} width="100%" className={cls.username} />
                            <Skeleton height={24} className={cls.username} />
                            <VStack gap="4" className={cls.footer} max>
                                <HStack max justify="between">
                                    <Skeleton height={24} width="50%" className={cls.username} />
                                    <Skeleton height={50} width={120} />
                                </HStack>
                            </VStack>
                        </VStack>
                    </Card>
                </div>
            );
        }

        return (
            <div
                className={classNames(cls.CustomerListItemRedesigned, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card} border="round" padding="16">
                    <VStack gap="8" align="center" justify="center">
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
