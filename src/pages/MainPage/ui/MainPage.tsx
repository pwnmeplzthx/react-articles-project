import { useTranslation } from 'react-i18next';
import { showNotification } from '@/entities/Notification/model/services/showNotification';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Page } from '@/widgets/Page/Page';
import { DropdownList } from '@/shared/ui/redesigned/Popups';
import { Role } from '@/entities/Role';

type Props = {}

const MainPage = (props: Props) => {
    const { t } = useTranslation('mainPage');
    const dispatch = useAppDispatch();

    const items: Role[] = [
        {
            id: '1',
            name: 'Администратор',
            is_active: true,
            created_at: '',
            modified_at: '',
            created_by: '',
            modified_by: '',
        },
        {
            id: '2',
            name: 'Пользователь',
            is_active: true,
            created_at: '',
            modified_at: '',
            created_by: '',
            modified_by: '',
        },
        {
            id: '3',
            name: 'Монтажник',
            is_active: true,
            created_at: '',
            modified_at: '',
            created_by: '',
            modified_by: '',
        },
    ];

    return (
        <Page>
            <Card max>
                {t('Main page')}
                <Button className="button mr-2" onClick={() => showNotification('success', 'hello world!', dispatch)}>Add success notification</Button>
                <DropdownList<Role> displayField="name" items={items} />
            </Card>
        </Page>
    );
};

export default MainPage;
