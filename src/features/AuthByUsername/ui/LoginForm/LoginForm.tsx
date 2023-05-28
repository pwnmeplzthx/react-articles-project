import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.loginForm, [className])}>
            <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={t('Enter login')}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Enter password')}
            />
            <Button
                className={cls.loginBtn}
            >
                {t('Log in')}
            </Button>
        </div>
    );
};
