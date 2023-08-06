import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { getRouteUsers } from '@/app/providers/router/config/routeConfig';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import cls from './UserDetailsPage.module.scss';
import { UserDetailsCard } from '@/entities/User/ui/UserDetailsCard/UserDetailsCard';
import { Card } from '@/shared/ui/Card/Card';

interface UserDetailsPageProps {
    className?: string;
}

const UserDetailsPage = (props: UserDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(getRouteUsers());
    }, [navigate]);

    if (!id) {
        if (__PROJECT__ === 'storybook') {
            return (
                <Page className={classNames(cls.userDetailsPage, [className])}>
                    hello world
                </Page>
            );
        }
        return (
            <Page className={classNames(cls.userDetailsPage, [className])}>
                {t('The user not found')}
            </Page>
        );
    }

    return (
        <Page className={classNames(cls.userDetailsPage, [className])}>
            <UserDetailsCard id={id} />
        </Page>
    );
};

export default memo(UserDetailsPage);
