import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import cls from './CreateUserForm.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { createUserActions, createUserReducer } from '../../model/slice/createUserSlice';
import { getUserData } from '../../model/selectors/getUserData';
import { getUserIsLoading } from '../../model/selectors/getUserIsLoading';
import { getUserError } from '../../model/selectors/getUserError';
import { createUserData } from '../../model/services/createUserData/createUserData';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export interface CreateUserFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    createUser: createUserReducer,
};

const CreateUserForm = memo(({ className, onSuccess }: CreateUserFormProps) => {
    const { t } = useTranslation();

    const [step, setStep] = useState(1);
    const handleNextStep = () => {
        setStep(step + 1);
    };
    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    // Кастомный хук для типизации диспатча
    const dispatch = useAppDispatch();

    // Вытаскиваем поля точечно, потому что объект может быть undefined
    const data = useSelector(getUserData);
    const isLoading = useSelector(getUserIsLoading);
    const error = useSelector(getUserError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ username: value || '' }));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ password: value || '' }));
    }, [dispatch]);

    const onChangeName = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ name: value || '' }));
    }, [dispatch]);

    const onChangeSurname = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ surname: value || '' }));
    }, [dispatch]);

    const onChangePatronymic = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ patronymic: value || '' }));
    }, [dispatch]);

    const onChangePhone = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ phone: value || '' }));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ email: value || '' }));
    }, [dispatch]);

    const onChangeWhatsapp = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ whatsapp: value || '' }));
    }, [dispatch]);

    const onChangeTelegram = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ telegram: value || '' }));
    }, [dispatch]);

    const onCreateUserClick = useCallback(async () => {
        const result = await dispatch(createUserData());
        // Для подсветки полей требуется типизация диспатча
        // https://redux-toolkit.js.org/usage/usage-with-typescript
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, onSuccess]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onCreateUserClick();
        }
    }, [onCreateUserClick]);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div className={classNames(cls.createUserForm, [className])}>
                <Text className={classNames(cls.formTitle)} title={t('Создание пользователя')} />
                {error && <Text text={t('Incorrect createUser or password')} theme={TextTheme.ERROR} />}
                {step === 1 && (
                    <VStack gap="16" max align="center">
                        <div className={classNames(cls.inputsWrapper)}>
                            <VStack gap="16" max>
                                <Input
                                    autofocus
                                    onChange={onChangeName}
                                    value={data?.name || ''}
                                    label={t('Имя')}
                                    className={cls.input}
                                    size="l"
                                    required
                                    placeholder={t('Введите имя')}
                                />
                                <Input
                                    onChange={onChangeSurname}
                                    value={data?.surname || ''}
                                    label={t('Фамилия')}
                                    className={cls.input}
                                    size="l"
                                    required
                                    placeholder={t('Введите фамилию')}
                                />
                                <Input
                                    onChange={onChangePatronymic}
                                    value={data?.patronymic || ''}
                                    label={t('Отчество')}
                                    className={cls.input}
                                    size="l"
                                    placeholder={t('Введите отчество')}
                                />
                                <Input
                                    onChange={onChangePhone}
                                    value={data?.phone || ''}
                                    label={t('Телефон')}
                                    className={cls.input}
                                    size="l"
                                    required
                                    placeholder={t('Введите номер телефона')}
                                />
                                <Input
                                    onChange={onChangeEmail}
                                    value={data?.email || ''}
                                    label={t('Почта')}
                                    className={cls.input}
                                    size="l"
                                    placeholder={t('Введите e-mail')}
                                />
                                <Input
                                    onChange={onChangeWhatsapp}
                                    value={data?.whatsapp || ''}
                                    label={t('Whatsapp')}
                                    className={cls.input}
                                    size="l"
                                    placeholder={t('Введите whatsapp')}
                                />
                                <Input
                                    onChange={onChangeTelegram}
                                    value={data?.telegram || ''}
                                    label={t('Telegram')}
                                    className={cls.input}
                                    size="l"
                                    placeholder={t('Введите telegram')}
                                />
                            </VStack>
                        </div>
                        <HStack max justify="end">
                            <Button
                                variant="outline"
                                className={cls.createUserBtn}
                                onClick={handleNextStep}
                                disabled={isLoading}
                            >
                                {t('Далее')}
                            </Button>
                        </HStack>
                    </VStack>
                )}
                {step === 2 && (
                    <VStack gap="16" max>
                        <Input
                            autofocus
                            onChange={onChangeUsername}
                            value={data?.username || ''}
                            label={t('Логин')}
                            className={cls.input}
                            size="l"
                            required
                            placeholder={t('Введите логин')}
                        />
                        <Input
                            onChange={onChangePassword}
                            value={data?.password || ''}
                            label={t('Пароль')}
                            className={cls.input}
                            size="l"
                            required
                            placeholder={t('Введите пароль')}
                        />
                        <HStack max justify="between">
                            <Button
                                variant="outline"
                                className={cls.createUserBtn}
                                onClick={handlePreviousStep}
                                disabled={isLoading}
                            >
                                {t('Назад')}
                            </Button>
                            <Button
                                variant="outline"
                                className={cls.createUserBtn}
                                onClick={onCreateUserClick}
                                disabled={isLoading}
                            >
                                {t('Создать пользователя')}
                            </Button>
                        </HStack>
                    </VStack>
                )}
            </div>
        </DynamicModuleLoader>
    );
});

export default CreateUserForm;
