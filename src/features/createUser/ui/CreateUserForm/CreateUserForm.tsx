import {
    memo, useCallback, useEffect,
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

export interface CreateUserFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    createUser: createUserReducer,
};

const CreateUserForm = memo(({ className, onSuccess }: CreateUserFormProps) => {
    const { t } = useTranslation();
    // Кастомный хук для типизации диспатча
    const dispatch = useAppDispatch();

    // Вытаскиваем поля точечно, потому что объект может быть undefined
    const data = useSelector(getUserData);
    const isLoading = useSelector(getUserIsLoading);
    const error = useSelector(getUserError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ username: value || '' }));
    }, [dispatch]);

    const onChangeName = useCallback((value: string) => {
        dispatch(createUserActions.createUser({ name: value || '' }));
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
                <Text title={t('Authorization form')} />
                {error && <Text text={t('Incorrect createUser or password')} theme={TextTheme.ERROR} />}
                <Input
                    autofocus
                    onChange={onChangeUsername}
                    value={data?.username}
                    className={cls.input}
                    size="l"
                    placeholder={t('Enter createUser')}
                />
                <Input
                    type="password"
                    onChange={onChangeName}
                    value={data?.name}
                    className={cls.input}
                    size="l"
                    placeholder={t('Enter password')}
                />
                <Button
                    variant="outline"
                    className={cls.createUserBtn}
                    onClick={onCreateUserClick}
                    disabled={isLoading}
                >
                    {t('Создать пользователя')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default CreateUserForm;
