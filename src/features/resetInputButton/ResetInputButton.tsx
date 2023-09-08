import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import CrossIcon from '@/shared/assets/icons/cross-20x20.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ResetInputButton.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ResetInputButtonProps {
    className?: string;
    onClick: any;
}

export const ResetInputButton = memo((props: ResetInputButtonProps) => {
    const {
        className,
        onClick,
    } = props;

    const { t } = useTranslation();

    // Кастомный хук для типизации диспатча
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(onClick);
    };

    return (
        <Icon
            className={classNames(cls.resetInputButton, [className])}
            Svg={CrossIcon}
            clickable
            onClick={onClickHandler}
            width={16}
            height={16}
            title={t('Очистить поле')}
        />
    );
});
