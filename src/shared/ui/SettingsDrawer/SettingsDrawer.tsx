import React, {
    memo, ReactNode, useCallback, useEffect,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
import { Overlay } from '../redesigned/Overlay/Overlay';
import cls from './SettingsDrawer.module.scss';
import { Portal } from '../redesigned/Portal/Portal';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const width = window.innerWidth - (window.innerWidth / 2);

export const DrawerContent = memo((props: DrawerProps) => {
    const { Spring, Gesture } = useAnimationLibs();
    const [{ x }, api] = Spring.useSpring(() => ({ x: width }));
    const { theme } = useTheme();
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy,
    } = props;

    const openDrawer = useCallback(() => {
        api.start({ x: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        api.start({
            x: width,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [vx],
            direction: [dx],
            movement: [mx],
            cancel,
        }) => {
            if (mx < -70) cancel();

            if (last) {
                if (mx > width * 0.5 || (vx > 0.5 && dx > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ x: mx, immediate: true });
            }
        },
        {
            from: () => [0, x.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = x.to((px) => (px < width ? 'block' : 'none'));

    return (
        <Portal>
            <div className={classNames(cls.SettingsDrawer, [className, theme, 'app_drawer'])}>
                <Overlay onClick={() => close()} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{ display, right: `calc(-100vw + ${width}px)`, x }}
                    {...bind()}
                >
                    <div className={cls.settingsWrapper}>
                        {children}
                    </div>
                </Spring.a.div>
            </div>
        </Portal>
    );
});

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

export const SettingsDrawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
);
