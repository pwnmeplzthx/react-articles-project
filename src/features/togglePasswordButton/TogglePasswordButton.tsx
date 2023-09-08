import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeOpenedIcon from '@/shared/assets/icons/eye-opened-32x32.svg';
import EyeClosedIcon from '@/shared/assets/icons/eye-closed-32x32.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TogglePasswordButton.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface TogglePasswordButtonProps {
    className?: string;
    onClick: any;
    currentState: boolean;
}

export const TogglePasswordButton = memo((props: TogglePasswordButtonProps) => {
    const {
        className,
        onClick,
        currentState,
    } = props;

    const { t } = useTranslation();

    // Кастомный хук для типизации диспатча
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(onClick);
    };

    return (
        currentState
            ? (
                <Icon
                    className={classNames(cls.togglePasswordButton, [className])}
                    Svg={EyeOpenedIcon}
                    clickable
                    onClick={onClickHandler}
                    width={24}
                    height={24}
                    title={t('Скрыть пароль')}
                />
            )
            : (
                <Icon
                    className={classNames(cls.togglePasswordButton, [className])}
                    Svg={EyeClosedIcon}
                    clickable
                    onClick={onClickHandler}
                    width={24}
                    height={24}
                    title={t('Показать пароль')}
                />
            )

    );
});
