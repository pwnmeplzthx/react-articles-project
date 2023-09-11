import { useTranslation } from 'react-i18next';
import { showNotification } from '@/entities/Notification/model/services/showNotification';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Page } from '@/widgets/Page/Page';

type Props = {}

const MainPage = (props: Props) => {
    const { t } = useTranslation('mainPage');
    const dispatch = useAppDispatch();

    return (
        <Page>
            <Card max>
                {t('Main page')}
                <Button className="button mr-2" onClick={() => showNotification('success', 'hello world!', dispatch)}>Add success notification</Button>
            </Card>
        </Page>
    );
};

export default MainPage;
