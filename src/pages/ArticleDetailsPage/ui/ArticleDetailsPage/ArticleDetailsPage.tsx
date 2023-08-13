import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page/Page';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleRating } from '@/features/articleRating';
import { getRouteArticles } from '@/app/providers/router/config/routeConfig';

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
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    if (!id) {
        if (__PROJECT__ === 'storybook') {
            return (
                <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                    <Page className={classNames(cls.articleDetailsPage, [className])}>
                        <VStack gap="32" max>
                            <Card max>
                                <VStack gap="16" max>
                                    <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                                        {t('Назад к списку')}
                                    </Button>
                                    <ArticleDetails id="1" />
                                </VStack>
                            </Card>
                            <Card max>
                                <ArticleRecommendationsList />
                            </Card>
                            <Card max>
                                <ArticleDetailsComments id="1" />
                            </Card>
                        </VStack>
                    </Page>
                </DynamicModuleLoader>
            );
        }
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
                        <ArticleRating articleId={id} />
                    </Card>
                    <Card max>
                        <ArticleRecommendationsList />
                    </Card>
                    <Card max>
                        <ArticleDetailsComments id={id} />
                    </Card>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
