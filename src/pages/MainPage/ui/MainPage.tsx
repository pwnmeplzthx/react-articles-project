import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card/Card';
import { Page } from '@/widgets/Page/Page';

type Props = {}

const MainPage = (props: Props) => {
    const { t } = useTranslation('mainPage');

    return (
        <Page>
            <Card max>
                {t('Main page')}
            </Card>
        </Page>
    );
};

export default MainPage;
