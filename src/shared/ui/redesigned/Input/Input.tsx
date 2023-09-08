import React, {
    InputHTMLAttributes,
    memo,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { HStack, VStack } from '../Stack';
import { Text } from '../Text';
import { ResetInputButton } from '@/features/resetInputButton/ResetInputButton';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';
type InputWidth = 'half'| 'threeQuarters' | 'full'

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    size?: InputSize;
    widthPercent?: InputWidth;
    required?: boolean;
    minLength?: number;
    resetHandler?: () => void;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        label,
        size = 'm',
        widthPercent = 'full',
        required = false,
        resetHandler,
        minLength,
        ...otherProps
    } = props;
    const { t } = useTranslation();
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isErrors, setIsErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const errosHandler = (inputValue: any = value) => {
        if (required && inputValue?.toString().trim() === '') {
            setErrorMessage(t('Обязательно для заполнения'));
            setIsErrors(true);
        } else if (minLength && inputValue?.toString().length < minLength && inputValue?.toString().length !== 0) {
            setErrorMessage(`${t('Минимальное количество символов')} ${minLength}`);
            setIsErrors(true);
        } else {
            setErrorMessage('');
            setIsErrors(false);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        errosHandler(e.target.value);
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        errosHandler();
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.requiredError]: isErrors,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };

    const input = (
        <div
            className={classNames(cls.InputWrapper, [
                className,
                cls[size],
                cls[widthPercent],
            ], mods)}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
            <div className={cls.addonRight}>{resetHandler && !readonly && value?.toString() !== '' ? <ResetInputButton onClick={resetHandler} /> : addonRight}</div>
        </div>
    );

    if (label) {
        return (
            <HStack max gap="8">
                {!readonly && required
                    ? (
                        <>
                            <Text text={`${label}`} />
                            <Text variant="error" text="*" />
                        </>
                    )
                    : <Text text={label} />}
                <VStack gap="8" max>
                    {input}
                    {isErrors && <Text size="s" variant="error" text={errorMessage} />}
                </VStack>
            </HStack>

        );
    }

    return (
        <VStack gap="8" max>
            {input}
            {isErrors && <Text size="s" variant="error" text={errorMessage} />}
        </VStack>
    );
});
