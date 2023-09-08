import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CreateUserButton.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/user-circle-32x32.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { CreateUserModal } from '../createUser';

interface CreateUserButtonProps {
    className?: string;
}

export const CreateUserButton = memo((props: CreateUserButtonProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const [isOpenCreateModal, setIsCreateModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsCreateModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsCreateModal(true);
    }, []);

    return (
        <Card border="round">
            <Icon
                Svg={CircleIcon}
                clickable
                onClick={onShowModal}
                width={32}
                height={32}
                title={t('Создать пользователя')}
                className={classNames(cls.CreateUserButton, [className])}
            />
            {isOpenCreateModal && (
                <CreateUserModal
                    isOpen={isOpenCreateModal}
                    onClose={onCloseModal}
                />
            )}
        </Card>

    );
});
