import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { getRouteArticles } from '@/app/providers/router/config/routeConfig';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page/Page';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import cls from './ArticleDetailsPage.module.scss';

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
                    <StickyContentLayout
                        content={(
                            <Page
                                className={classNames(
                                    cls.ArticleDetailsPage,
                                    [className],
                                )}
                            >
                                <VStack gap="16" max>
                                    <DetailsContainer />
                                    <ArticleRating articleId="1" />
                                    <ArticleRecommendationsList />
                                    <ArticleDetailsComments id="1" />
                                </VStack>
                            </Page>
                        )}
                        right={<AdditionalInfoContainer />}
                    />
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
            <StickyContentLayout
                content={(
                    <Page
                        className={classNames(
                            cls.ArticleDetailsPage,
                            [className],
                        )}
                    >
                        <VStack gap="32" max>
                            <DetailsContainer />
                            <ArticleRating articleId={id} />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </Page>
                )}
                right={<AdditionalInfoContainer />}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
