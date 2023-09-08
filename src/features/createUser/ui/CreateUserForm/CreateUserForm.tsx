import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './CreateUserForm.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { createUserActions, createUserReducer } from '../../model/slice/createUserSlice';
import { getUserData } from '../../model/selectors/getUserData';
import { getUserIsLoading } from '../../model/selectors/getUserIsLoading';
import { getUserError } from '../../model/selectors/getUserError';
import { createUserData } from '../../model/services/createUserData/createUserData';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { formatTelephoneNumber } from '@/shared/lib/formatTelephoneNumber';
import { ResetInputButton } from '@/features/resetInputButton/ResetInputButton';
import { capitalizeFirstLetter } from '@/shared/lib/capitalizeFirstLetter';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { TogglePasswordButton } from '@/features/togglePasswordButton/TogglePasswordButton';

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

    const [showPassword, setShowPassword] = useState(false);

    // Вытаскиваем поля точечно, потому что объект может быть undefined
    const data = useSelector(getUserData);
    const isLoading = useSelector(getUserIsLoading);
    const error = useSelector(getUserError);

    const resetHandler = useCallback((resetData: any) => () => { dispatch(resetData); }, [dispatch]);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ username: value || '' }));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ password: value || '' }));
    }, [dispatch]);

    const onChangeName = useCallback((value: string) => {
        value = capitalizeFirstLetter(value);
        dispatch(createUserActions.createUser({ name: value.replace(/\d/g, '') || '' }));
    }, [dispatch]);

    const onChangeSurname = useCallback((value: string) => {
        value = capitalizeFirstLetter(value);
        dispatch(createUserActions.createUser({ surname: value.replace(/\d/g, '') || '' }));
    }, [dispatch]);

    const onChangePatronymic = useCallback((value: string) => {
        value = capitalizeFirstLetter(value);
        dispatch(createUserActions.createUser({ patronymic: value.replace(/\d/g, '') || '' }));
    }, [dispatch]);

    const onChangePhone = useCallback((value: string) => {
        value = value.replace(/\D/g, '');
        dispatch(createUserActions.createUser({ phone: formatTelephoneNumber(value) || '' }));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ email: value || '' }));
    }, [dispatch]);

    const onChangeWhatsapp = useCallback((value: string) => {
        value = value.replace(/\D/g, '');
        dispatch(createUserActions.createUser({ whatsapp: formatTelephoneNumber(value) || '' }));
    }, [dispatch]);

    const onChangeTelegram = useCallback((value: string) => {
        value = value.replace(/\D/g, '');
        dispatch(createUserActions.createUser({ telegram: formatTelephoneNumber(value) || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ avatar: value || '' }));
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
                <Text size="l" className={classNames(cls.formTitle)} title={t('Создание пользователя')} />
                {step === 1 && (
                    <VStack gap="16" maxHeight max align="center">
                        <Text size="m" title={t('Шаг 1 из 3 - персональные данные')} />
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
                                    resetHandler={resetHandler(createUserActions.createUser({ name: '' }))}
                                    placeholder={t('Введите имя')}
                                />
                                <Input
                                    onChange={onChangeSurname}
                                    value={data?.surname || ''}
                                    label={t('Фамилия')}
                                    className={cls.input}
                                    size="l"
                                    required
                                    resetHandler={resetHandler(createUserActions.createUser({ surname: '' }))}
                                    placeholder={t('Введите фамилию')}
                                />
                                <Input
                                    onChange={onChangePatronymic}
                                    value={data?.patronymic || ''}
                                    label={t('Отчество')}
                                    className={cls.input}
                                    size="l"
                                    resetHandler={resetHandler(createUserActions.createUser({ patronymic: '' }))}
                                    placeholder={t('Введите отчество')}
                                />
                                <Input
                                    onChange={onChangePhone}
                                    value={data?.phone || ''}
                                    label={t('Телефон')}
                                    className={cls.input}
                                    size="l"
                                    resetHandler={resetHandler(createUserActions.createUser({ phone: '' }))}
                                    placeholder="+7 (000) 000-00-00"
                                />
                                <Input
                                    onChange={onChangeWhatsapp}
                                    value={data?.whatsapp || ''}
                                    label={t('Whatsapp')}
                                    className={cls.input}
                                    size="l"
                                    resetHandler={resetHandler(createUserActions.createUser({ whatsapp: '' }))}
                                    placeholder="+7 (000) 000-00-00"
                                />
                                <Input
                                    onChange={onChangeTelegram}
                                    value={data?.telegram || ''}
                                    label={t('Telegram')}
                                    className={cls.input}
                                    size="l"
                                    resetHandler={resetHandler(createUserActions.createUser({ telegram: '' }))}
                                    placeholder="+7 (000) 000-00-00"
                                />
                                <Input
                                    onChange={onChangeEmail}
                                    value={data?.email || ''}
                                    label={t('Почта')}
                                    className={cls.input}
                                    size="l"
                                    resetHandler={resetHandler(createUserActions.createUser({ email: '' }))}
                                    placeholder="abcdefgh@gmail.com"
                                />
                            </VStack>
                        </div>
                        <HStack max justify="end">
                            <Button
                                variant="outline"
                                className={cls.createUserBtn}
                                onClick={handleNextStep}
                                disabled={isLoading || data?.name === '' || data?.name === undefined || data?.surname === '' || data?.surname === undefined}
                            >
                                {t('Далее')}
                            </Button>
                        </HStack>
                    </VStack>
                )}
                {step === 2 && (
                    <VStack gap="16" maxHeight max align="center">
                        <Text size="m" title={t('Шаг 2 из 3 - настрока доступа')} />
                        <div className={classNames(cls.inputsWrapper)}>
                            Change role
                        </div>
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
                                onClick={handleNextStep}
                                disabled={isLoading}
                            >
                                {t('Далее')}
                            </Button>
                        </HStack>
                    </VStack>
                )}
                {step === 3 && (
                    <VStack gap="16" maxHeight max justify="around" align="center">
                        <Text size="m" title={t('Шаг 3 из 3 - данные учетной записи')} />
                        <div className={classNames(cls.inputsWrapper)}>
                            <VStack gap="16" maxHeight max>
                                <HStack justify="center" max>
                                    <Avatar size={128} src={data?.avatar} />
                                </HStack>
                                <Input
                                    autofocus
                                    onChange={onChangeAvatar}
                                    value={data?.avatar || ''}
                                    label={t('Аватар')}
                                    className={cls.input}
                                    size="l"
                                    resetHandler={resetHandler(createUserActions.createUser({ avatar: '' }))}
                                    placeholder={t('Ссылка на аватар')}
                                />
                                <Input
                                    autofocus
                                    onChange={onChangeUsername}
                                    value={data?.username || ''}
                                    label={t('Логин')}
                                    className={cls.input}
                                    size="l"
                                    required
                                    resetHandler={resetHandler(createUserActions.createUser({ username: '' }))}
                                    placeholder={t('Введите логин')}
                                />
                                <Input
                                    onChange={onChangePassword}
                                    value={data?.password || ''}
                                    label={t('Пароль')}
                                    className={cls.input}
                                    size="l"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t('Введите пароль')}
                                    addonRight={<TogglePasswordButton currentState={showPassword} onClick={() => { setShowPassword(!showPassword); }} />}
                                />
                            </VStack>
                        </div>
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
                                disabled={isLoading || data?.username === '' || data?.username === undefined || data?.password === '' || data?.password === undefined}
                                color="success"
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
