import { useTranslation } from "react-i18next";

type Props = {}

const AboutPage = (props: Props) => {

    const { t } = useTranslation('about');

    return (
        <div>
            {t('About page')}
        </div>
    )
}

export default AboutPage