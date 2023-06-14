import { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

// extends EntityState<Comment> для работы с createEntityAdapter наследует поля ids: [], entities: {},
export interface ArticleDetailsCommentsSchema extends EntityState<Comment>{
    isLoading?: boolean;
    error?: string;
}
