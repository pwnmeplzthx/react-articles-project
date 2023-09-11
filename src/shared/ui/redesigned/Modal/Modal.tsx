import React, {
    ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Icon } from '../Icon';
import CrossIcon from '@/shared/assets/icons/cross-20x20.svg';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    // Вмонтирование модалки в дом дерево при ее открытии ( см isMounted setIsMounted)
    lazy?: boolean;
    closeButton?: boolean;
}

export const Modal = (props: ModalProps) => {
    const {
        className, children, isOpen, onClose, lazy, closeButton,
    } = props;

    const { theme } = useTheme();

    const { t } = useTranslation();

    const {
        close,
        isClosing,
        isMounted,
    } = useModal({
        // Передаваемые параметры в хук useMidal
        animationDelay: 300,
        onClose,
        isOpen,
    });

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    // Если указано lazy и компонент не вмонтирован не отрисовывать его
    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.body}>
            <div className={classNames(cls.modalNew, [className, theme, 'app_modal'], mods)}>
                {closeButton
                    ? <Overlay onClick={() => {}} />
                    : <Overlay onClick={close} /> }
                <div className={cls.content} onClick={onContentClick}>
                    {children}
                    {closeButton && (
                        <Icon
                            className={classNames(cls.closeModalButton, [className])}
                            Svg={CrossIcon}
                            clickable
                            onClick={close}
                            width={24}
                            height={24}
                            title={t('Закрыть окно')}
                        />
                    )}
                </div>
            </div>
        </Portal>
    );
};
