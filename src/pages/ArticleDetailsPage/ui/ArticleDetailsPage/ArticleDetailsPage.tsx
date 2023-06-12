import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('articlePage');

    return (
        <div className={classNames(cls.articleDetailsPage, [className])}>
            ARTICLE DETAILS
        </div>
    );
};

export default memo(ArticleDetailsPage);