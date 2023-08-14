import {
    memo, useCallback, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Button } from '@/shared/ui/redesigned/Button';
import UserIcon from '@/shared/assets/icons/login-24x24.svg';
import PasswordIcon from '@/shared/assets/icons/password-20x20.svg';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    // Кастомный хук для типизации диспатча
    const dispatch = useAppDispatch();

    // Вытаскиваем поля точечно, потому что объект может быть undefined
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        // Для подсветки полей требуется типизация диспатча
        // https://redux-toolkit.js.org/usage/usage-with-typescript
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, password, username, onSuccess]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onLoginClick();
        }
    }, [onLoginClick]);

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
            <div className={classNames(cls.loginForm, [className])}>
                <Text title={t('Authorization form')} />
                {error && <Text text={t('Incorrect login or password')} theme={TextTheme.ERROR} />}
                <Input
                    autofocus
                    onChange={onChangeUsername}
                    value={username}
                    className={cls.input}
                    size="l"
                    placeholder={t('Enter login')}
                    addonLeft={<Icon Svg={UserIcon} />}
                />
                <Input
                    type="password"
                    onChange={onChangePassword}
                    value={password}
                    className={cls.input}
                    size="l"
                    placeholder={t('Enter password')}
                    addonLeft={<Icon Svg={PasswordIcon} />}
                />
                <Button
                    variant="outline"
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Log in')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
