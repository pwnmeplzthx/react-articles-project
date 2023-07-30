import {
    ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState,
} from 'react';

// Наследование от html атрибута, чтобы была возможность использовать все пропсы тега image
interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        errorFallback,
        fallback,
        ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // useLayoutEffect отрабатывает асинхронно перед монтированием
    // useEffect отрабатывает асинхронно, после того, как компонент вмонтировался в дом-дерево
    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return (
        <img className={className} src={src} alt={alt} {...otherProps} />
    );
});
