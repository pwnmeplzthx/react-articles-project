import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import cls from './AuthPage.module.scss';

interface AuthPageProps {
    className?: string;
}

const AuthPage = (props: AuthPageProps) => {
    const { className } = props;
    const { t } = useTranslation('authPage');

    return (
        <Page className={classNames(cls.authPage, [className])}>
            Auth page!!!
        </Page>
    );
};

export default memo(AuthPage);
