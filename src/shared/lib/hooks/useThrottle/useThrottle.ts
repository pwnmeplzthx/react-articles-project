import { useCallback, useRef } from 'react';

// Позволяет выполнить только 1 событие в промежуток времени
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    // Показывает, можно вызывать сейчас колбек, или нельзя
    const throttleRef = useRef(false);

    return useCallback((...args: any[]) => {
        if (!throttleRef.current) {
            callback(...args);
            throttleRef.current = true;

            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        }
    }, [callback, delay]);
}
