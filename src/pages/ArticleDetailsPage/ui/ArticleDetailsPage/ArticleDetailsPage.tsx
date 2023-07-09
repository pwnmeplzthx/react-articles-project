import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/addCommentForm';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import { Card } from 'shared/ui/Card/Card';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('articlePage');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, [className])}>
                {t('The article not found')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.articleDetailsPage, [className])}>
                <VStack gap="32" max>
                    <Card max>
                        <VStack gap="16" max>
                            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                                {t('Назад к списку')}
                            </Button>
                            <ArticleDetails id={id} />
                        </VStack>
                    </Card>
                    <Card max>
                        <VStack gap="16" max>
                            <Text
                                size={TextSize.L}
                                className={cls.commentTitle}
                                title={t('Рекомендуем')}
                            />
                            <ArticleList
                                articles={recommendations}
                                isLoading={recommendationsIsLoading}
                                className={cls.recommendations}
                                target="_blank"
                            />
                        </VStack>
                    </Card>
                    <Card max>
                        <VStack gap="16" max>
                            <Text size={TextSize.L} className={cls.commentTitle} title={t('Comments')} />
                            <HStack max>
                                <AddCommentForm onSendComment={onSendComment} />
                            </HStack>
                            <CommentList
                                isLoading={commentsIsLoading}
                                comments={comments}
                            />
                        </VStack>
                    </Card>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
