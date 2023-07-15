import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card/Card';
import { Page } from '@/widgets/Page/Page';

const ForbiddenPage = () => {
    const { t } = useTranslation('');

    return (
        <Page>
            <Card>
                {t('У вас нет доступа к этой странице')}
            </Card>
        </Page>
    );
};

export default ForbiddenPage;
