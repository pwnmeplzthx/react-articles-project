import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';

// Обобщающий тип 2 схем
export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleDetailsRecommendationsSchema;
}
