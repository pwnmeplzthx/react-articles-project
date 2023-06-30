import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

type Props = {}

const MainPage = (props: Props) => {
    const { t } = useTranslation('mainPage');

    return (
        <Page>
            {t('Main page')}
        </Page>
    );
};

export default MainPage;
