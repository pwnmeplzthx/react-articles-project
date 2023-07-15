import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card/Card';
import { Page } from '@/widgets/Page/Page';
import { RatingCard } from '@/entities/Rating';
import { StarRating } from '@/shared/ui/StarRating/StarRating';

type Props = {}

const MainPage = (props: Props) => {
    const { t } = useTranslation('mainPage');

    return (
        <Page>
            <Card max>
                {t('Main page')}
                <RatingCard title="Rating" feedbackTitle="some text" hasFeedback />
            </Card>
        </Page>
    );
};

export default MainPage;
