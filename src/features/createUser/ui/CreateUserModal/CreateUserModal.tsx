import { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { CreateUserFormAsync } from '../CreateUserForm/CreateUserForm.async';

interface CreateUserModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const CreateUserModal = ({ className, isOpen, onClose }: CreateUserModalProps) => (
    <Modal
        className={classNames('', [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <CreateUserFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
