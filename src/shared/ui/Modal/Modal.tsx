import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    // Вмонтирование модалки в дом дерево при ее открытии ( см isMounted setIsMounted)
    lazy?: boolean;
}

const ANIMATION_DELAY = 200;

export const Modal = (props: ModalProps) => {
    const {
        className, children, isOpen, onClose, lazy,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    // Состояние вмонтирована модалка в дом дерево или нет
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    // В closeHandler в этот реф кладется ассинхронная функция, их нужно очищать внутри useEffect при onmount
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const { theme } = useTheme();

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    const closeHandler = useCallback(() => {
        if (onClose) {
            // Установка стилей, отвечающих за анимацию закрытия (mods в classNames)
            setIsClosing(true);
            // Ругается на тип setTimeout, обрати внимание на ReturnType<typeof setTimeout>
            // делаем закрытие с задержкой, чтобы анимация успела отработать
            timerRef.current = setTimeout(() => {
                onClose();
                // Отключение стилей. отвечающих за анимацию
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // На каждый перерендер компонента стрелочные функции создаются заного
    // Нужно сохранять ссылку на эту функцию: useCallback
    // Этот хук мемоизирует значение функции и всегда возвращает ссылку на одну и ту же функцию, если в массиве зависимостей ничего не изменилось
    // npm install eslint-plugin-react-hooks --save-dev
    // https://legacy.reactjs.org/docs/hooks-rules.html
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            // Читай описание timerRef
            clearTimeout(timerRef.current);
        };
    }, [isOpen, onKeyDown]);

    // Если указано lazy и компонент не вмонтирован не отрисовывать его
    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.modal, [className], mods)}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
