import { useTranslation } from "react-i18next";

type Props = {}

const MainPage = (props: Props) => {

    const { t } = useTranslation('mainPage');

    return (
        <div>
            {t('Main page')}
        </div>
    )
}

export default MainPage