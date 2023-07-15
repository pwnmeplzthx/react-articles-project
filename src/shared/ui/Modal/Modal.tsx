import { useTheme } from 'app/providers/ThemeProvider';
import React, {
    ReactNode,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    // Вмонтирование модалки в дом дерево при ее открытии ( см isMounted setIsMounted)
    lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
    const {
        className, children, isOpen, onClose, lazy,
    } = props;

    const { theme } = useTheme();

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
        <Portal>
            <div className={classNames(cls.modal, [className, theme, 'app_modal'], mods)}>
                <Overlay onClick={close} />
                <div className={cls.content} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
