import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

type Props = {}

const AboutPage = (props: Props) => {
    const { t } = useTranslation('about');

    return (
        <Page>
            {t('About page')}
        </Page>
    );
};

export default AboutPage;
