import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Page } from 'widgets/Page/Page';

const AdminPanelPage = () => {
    const { t } = useTranslation('about');

    return (
        <Page>
            <Card max>
                {t('Админ панель')}
            </Card>
        </Page>
    );
};

export default AdminPanelPage;
