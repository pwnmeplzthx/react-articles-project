import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Input } from '@/shared/ui/Input/Input';
import { Loader } from '@/shared/ui/Loader/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { User } from '../../model/types/user';
import cls from './UserDetailsCard.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getUserDetailsError, getUserDetailsForm, getUserDetailsIsLoading, getUserDetailsValidateErrors,
    getUserDetailsReadonly,
} from '../../model/selectors/userDetails';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchUserData } from '../../model/services/fetchUserData';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { userDetailsReducer } from '../../model/slice/userDetailsSlice';
import { Card } from '@/shared/ui/Card/Card';

interface UserDetailsCardProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    userDetails: userDetailsReducer,
};

export const UserDetailsCard = (props: UserDetailsCardProps) => {
    const {
        className,
        id,
    } = props;
    const { t } = useTranslation();

    // Перед запросом данных получаем диспатч, чтобы работать с асинхронным экшеном
    const dispatch = useAppDispatch();

    // Достаем данные из стейта
    const data = useSelector(getUserDetailsForm);
    const isLoading = useSelector(getUserDetailsIsLoading);
    const error = useSelector(getUserDetailsError);
    const readonly = useSelector(getUserDetailsReadonly);
    const validateErrors = useSelector(getUserDetailsValidateErrors);

    // Предотвращение отправки запросов в storybook
    useInitialEffect(() => {
        if (id) {
            // Отправка запроса на получение данных профиля
            dispatch(fetchUserData(id));
        }
    });

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    if (isLoading) {
        return (
            <HStack justify="center" max className={classNames(cls.userDetailsCard, [className, cls.loading])}>
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack justify="center" max className={classNames(cls.userDetailsCard, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('An error occurred while loading the User')}
                    text={t('Try refreshing the page')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cls.cardsWrapper}>
                <Card className={cls.main}>
                    <VStack gap="16" max className={classNames(cls.userDetailsCard, [className], mods)}>
                        {data?.user_icon && (
                            <HStack justify="center" max>
                                <Avatar
                                    src={data?.user_icon}
                                    size={150}
                                />
                            </HStack>
                        )}
                        <Input
                            value={data?.username || ''}
                            placeholder={t('Username')}
                            className={cls.input}
                            // onChange={onChangeName}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.name || ''}
                            placeholder={t('Name')}
                            className={cls.input}
                            // onChange={onChangeName}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.surname || ''}
                            placeholder={t('Surname')}
                            className={cls.input}
                            // onChange={onChangeSurname}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.patronymic || ''}
                            placeholder={t('Patronymic')}
                            className={cls.input}
                            // onChange={onChangePatronymic}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.phone || ''}
                            placeholder={t('Phone')}
                            className={cls.input}
                            // onChange={onChangePhone}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.email || ''}
                            placeholder={t('E-mail')}
                            className={cls.input}
                            // onChange={onChangeEmail}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.user_icon || ''}
                            placeholder={t('Avatar link')}
                            className={cls.input}
                            // onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.whatsapp || ''}
                            placeholder={t('Whatsapp')}
                            className={cls.input}
                            // onChange={onChangeWhatsapp}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.telegram || ''}
                            placeholder={t('Telegram')}
                            className={cls.input}
                            // onChange={onChangeTelegram}
                            readonly={readonly}
                        />
                    </VStack>
                </Card>
                <Card className={cls.second}>
                    <VStack gap="16" max className={classNames(cls.userDetailsCard, [className], mods)}>
                        <Input
                            value={data?.salary || ''}
                            placeholder={t('Salary')}
                            className={cls.input}
                            // onChange={onChangeSalary}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.sale_percent || ''}
                            placeholder={t('Sale percent')}
                            className={cls.input}
                            // onChange={onChangeSalePercent}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.repair_percent || ''}
                            placeholder={t('Repair percent')}
                            className={cls.input}
                            // onChange={onChangeRepairPercent}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.create_order_percent || ''}
                            placeholder={t('Create order percent')}
                            className={cls.input}
                            // onChange={onChangeCreateOrderPercent}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.service_percent || ''}
                            placeholder={t('Service percent')}
                            className={cls.input}
                            // onChange={onChangeServicePercent}
                            readonly={readonly}
                        />
                    </VStack>
                </Card>
            </div>
        </DynamicModuleLoader>
    );
};
