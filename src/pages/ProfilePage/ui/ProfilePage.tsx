import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page/Page';
import { Card } from '@/shared/ui/redesigned/Card';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation('profilePage');
    const { id } = useParams<{ id: string }>();

    if (!id) {
        if (__PROJECT__ === 'storybook') {
            return (
                <Page className={classNames('', [className])}>
                    <Card>
                        <EditableProfileCard id="1" />
                    </Card>
                </Page>
            );
        }
        return <Text text={t('Профиль не найден')} />;
    }

    return (
        <Page className={classNames('', [className])}>
            <Card>
                <EditableProfileCard id={id} />
            </Card>
        </Page>
    );
};

export default ProfilePage;
