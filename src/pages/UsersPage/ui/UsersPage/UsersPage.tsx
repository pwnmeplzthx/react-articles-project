import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';
import cls from './UsersPage.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from './FiltersContainer/FiltersContainer';
import { UserInfiniteList } from '../UserInfiniteList/UserInfiniteList';
import { fetchNextUsersPage } from '../../model/services/fetchNextUsersPage/fetchNextUsersPage';
import { usersPageReducer } from '../../model/slices/usersPageSlice';
import { initUsersPage } from '../../model/services/initUsersPage/initUsersPage';

interface UsersPageProps {
    className?: string;
}

const reducers: ReducersList = {
    usersPage: usersPageReducer,
};

const UsersPage = (props: UsersPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextUsersPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initUsersPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <StickyContentLayout
                left={<ViewSelectorContainer />}
                right={<FiltersContainer />}
                content={(
                    <Page
                        data-testid="UsersPage"
                        onScrollEnd={onLoadNextPart}
                        className={classNames(
                            cls.usersPage,
                            [className],
                        )}
                    >
                        <UserInfiniteList className={cls.list} />
                    </Page>
                )}
            />
        </DynamicModuleLoader>
    );
};

export default memo(UsersPage);
