import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';
import { getRouteArticleEdit, getRouteArticles } from '@/app/providers/router/config/routeConfig';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const navigate = useNavigate();
        const article = useSelector(getArticleDetailsData);

        const onBackToList = useCallback(() => {
            navigate(getRouteArticles());
        }, [navigate]);

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id));
            }
        }, [article, navigate]);

        return (
            <HStack
                max
                justify="between"
                className={classNames('', [className])}
            >
                <Button variant="outline" onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>
                {/* {canEdit && (
                    <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
                        {t('Редактировать')}
                    </Button>
                )} */}
            </HStack>
        );
    },
);
