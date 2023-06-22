import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './AuthPage.module.scss';

interface AuthPageProps {
    className?: string;
}

const AuthPage = (props: AuthPageProps) => {
    const { className } = props;
    const { t } = useTranslation('authPage');

    return (
        <div className={classNames(cls.authPage, [className])}>
            Auth page
        </div>
    );
};

export default memo(AuthPage);
