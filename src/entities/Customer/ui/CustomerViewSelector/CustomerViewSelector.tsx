import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';

import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { CustomerView } from '../../model/consts/consts';
import cls from './CustomerViewSelector.module.scss';

interface CustomerViewSelectorProps {
    className?: string;
    view: CustomerView,
    onViewClick?: (view: CustomerView) => void;
}

const viewTypes = [
    {
        view: CustomerView.SMALL,
        icon: TiledIcon,
    },
    {
        view: CustomerView.BIG,
        icon: ListIcon,
    },
];

export const CustomerViewSelector = memo((props: CustomerViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: CustomerView) => () => {
        onViewClick?.(newView);
    };

    return (
        <Card
            className={classNames(
                cls.CustomerViewSelectorRedesigned,
                [className],
            )}
            border="round"
        >
            <HStack gap="8">
                {viewTypes.map((viewType) => (
                    <Icon
                        clickable
                        key={viewType.view}
                        onClick={onClick(viewType.view)}
                        Svg={viewType.icon}
                        className={classNames('', [], {
                            [cls.notSelected]: viewType.view !== view,
                        })}
                    />
                ))}
            </HStack>
        </Card>
    );
});
