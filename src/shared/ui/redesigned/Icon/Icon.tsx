import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

// Базовый интерфейс
interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    title?: string;
}

// Доработки для не кликабельных иконок
interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

// Доработки для кликабельных иконок
interface ClickableBaseProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        title,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(cls.Icon, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
                title={title}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
