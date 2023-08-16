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
                        <HStack align="start" max gap="16">
                            <div className={cls.avatarWrapper}>
                                <Skeleton height={150} width={150} />
                            </div>
                            <VStack className={cls.info} gap="16" max>
                                <VStack className={cls.info} gap="8" max>
                                    <Skeleton
                                        width={400}
                                        height={24}
                                        className={cls.title}
                                    />
                                    <Skeleton
                                        width={250}
                                        height={24}
                                        className={cls.title}
                                    />
                                </VStack>
                                <VStack className={cls.info} gap="8" max>
                                    <Skeleton
                                        width={150}
                                        height={16}
                                        className={cls.name}
                                    />
                                    <Skeleton
                                        width={150}
                                        height={16}
                                        className={cls.name}
                                    />
                                    <Skeleton
                                        width={150}
                                        height={16}
                                        className={cls.name}
                                    />
                                    <Skeleton
                                        width={150}
                                        height={16}
                                        className={cls.name}
                                    />
                                </VStack>
                                <VStack gap="4" className={cls.footer} max>
                                    <HStack max justify="end">
                                        <Skeleton height={40} width={120} />
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
                className={classNames(cls.CustomerListItemRedesigned, [
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
