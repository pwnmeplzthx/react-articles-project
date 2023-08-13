import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';
import { Card } from '@/shared/ui/redesigned/Card';

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
