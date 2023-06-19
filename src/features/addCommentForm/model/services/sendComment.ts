// ОСТАВЛЕНО ДЛЯ ПРИМЕРА

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getAddCommentFormText } from '../selectors/addCommentFormSelectors';
import { addCommentFormActions } from '../slices/addCommentFormSlice';

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
    'addCommentForm/sendComment',
    async (_, thunkAPI) => {
        const userData = getUserAuthData(thunkAPI.getState());
        const text = getAddCommentFormText(thunkAPI.getState());
        const articleData = getArticleDetailsData(thunkAPI.getState());

        if (!userData || !text || !articleData) {
            return thunkAPI.rejectWithValue('no data');
        }

        try {
            const response = await thunkAPI.extra.api.post<Comment>('/comments', {
                articleId: articleData.id,
                userId: userData.id,
                text,

            });

            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(addCommentFormActions.setText(''));

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);
