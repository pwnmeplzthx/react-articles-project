import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features/AuthByUsername';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { HStack } from '@/shared/ui/redesigned/Stack';
import cls from './AuthPage.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';

interface AuthPageProps {
    className?: string;
}

const AuthPage = (props: AuthPageProps) => {
    const { className } = props;
    const { t } = useTranslation('authPage');

    return (
        <Page className={classNames(cls.authPage, [className])}>
            <Card padding="24" border="round">
                <HStack className={cls.loginFormWrapper} justify="center" align="center" max>
                    <LoginForm onSuccess={() => {}} />
                </HStack>
            </Card>
        </Page>
    );
};

export default memo(AuthPage);
