import {
    MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
    lazy?: boolean;
}

export function useModal({
    animationDelay, isOpen, onClose, lazy,
}: UseModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    // Состояние вмонтирована модалка в дом дерево или нет
    const [isMounted, setIsMounted] = useState(false);
    // В closeHandler в этот реф кладется ассинхронная функция, их нужно очищать внутри useEffect при onmount
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const close = useCallback(() => {
        if (onClose) {
            // Установка стилей, отвечающих за анимацию закрытия (mods в classNames)
            setIsClosing(true);
            // Ругается на тип setTimeout, обрати внимание на ReturnType<typeof setTimeout>
            // делаем закрытие с задержкой, чтобы анимация успела отработать
            timerRef.current = setTimeout(() => {
                onClose();
                // Отключение стилей. отвечающих за анимацию
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    // На каждый перерендер компонента стрелочные функции создаются заного
    // Нужно сохранять ссылку на эту функцию: useCallback
    // Этот хук мемоизирует значение функции и всегда возвращает ссылку на одну и ту же функцию, если в массиве зависимостей ничего не изменилось
    // npm install eslint-plugin-react-hooks --save-dev
    // https://legacy.reactjs.org/docs/hooks-rules.html
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);

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

    return {
        isClosing,
        isMounted,
        close,
    };
}
