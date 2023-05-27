import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';

type Props = {}

const MainPage = (props: Props) => {
    const { t } = useTranslation('mainPage');

    return (
        <div>
            {t('Main page')}
            <Counter />
        </div>
    );
};

export default MainPage;
