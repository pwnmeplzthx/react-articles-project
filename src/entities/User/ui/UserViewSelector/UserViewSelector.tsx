import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';

import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { UserView } from '../../model/consts/consts';
import cls from './UserViewSelector.module.scss';

interface UserViewSelectorProps {
    className?: string;
    view: UserView,
    onViewClick?: (view: UserView) => void;
}

const viewTypes = [
    {
        view: UserView.SMALL,
        icon: TiledIcon,
    },
    {
        view: UserView.BIG,
        icon: ListIcon,
    },
];

export const UserViewSelector = memo((props: UserViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: UserView) => () => {
        onViewClick?.(newView);
    };

    return (
        <Card
            className={classNames(
                cls.UserViewSelectorRedesigned,
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
