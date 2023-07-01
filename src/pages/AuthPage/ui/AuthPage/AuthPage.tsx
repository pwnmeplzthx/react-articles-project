import { LoginForm } from 'features/AuthByUsername';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { HStack } from 'shared/ui/Stack';
import cls from './AuthPage.module.scss';

interface AuthPageProps {
    className?: string;
}

const AuthPage = (props: AuthPageProps) => {
    const { className } = props;
    const { t } = useTranslation('authPage');

    return (
        <Page className={classNames(cls.authPage, [className])}>
            <HStack className={cls.loginFormWrapper} justify="center" align="center" max>
                <LoginForm onSuccess={() => {}} />
            </HStack>
        </Page>
    );
};

export default memo(AuthPage);
