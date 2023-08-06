import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';
import cls from './UsersPage.module.scss';

interface UsersPageProps {
    className?: string;
}

const reducers: ReducersList = {
    // usersPage: usersPageReducer,
};

const UsersPage = (props: UsersPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                className={classNames(cls.usersPage, [className])}
            >
                users list
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(UsersPage);
