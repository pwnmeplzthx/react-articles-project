import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
import { notificationReducer } from '@/entities/Notificaion/model/slice/notificationSlice';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice';
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { articlesPageReducer } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';
import { usersPageReducer } from '@/pages/UsersPage/model/slices/usersPageSlice';
import { rtkApi } from '@/shared/api/rtkApi';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { customersPageReducer } from '@/pages/CustomersPage/model/slices/customersPageSlice';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
    articlesPage: articlesPageReducer,
    usersPage: usersPageReducer,
    notification: notificationReducer,
    customersPage: customersPageReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
