import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToTopButton.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-arrow-top.svg';
import { Card } from '@/shared/ui/redesigned/Card';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onCLick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Card border="round">
            <Icon
                Svg={CircleIcon}
                clickable
                onClick={onCLick}
                width={32}
                height={32}
                className={classNames(cls.ScrollToTopButton, [className])}
            />
        </Card>

    );
});
