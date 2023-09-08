import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation();

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
                title={t('В начало страницы')}
                className={classNames(cls.ScrollToTopButton, [className])}
            />
        </Card>

    );
});
