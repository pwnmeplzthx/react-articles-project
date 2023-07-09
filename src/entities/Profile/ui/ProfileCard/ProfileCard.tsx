import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import { HStack, VStack } from 'shared/ui/Stack';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profilePage');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    if (isLoading) {
        return (
            <HStack justify="center" max className={classNames(cls.ProfileCard, [className, cls.loading])}>
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack justify="center" max className={classNames(cls.ProfileCard, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('An error occurred while loading the profile')}
                    text={t('Try refreshing the page')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    return (
        <VStack gap="16" max className={classNames(cls.profileCard, [className], mods)}>
            {data?.avatar && (
                <HStack justify="center" max>
                    <Avatar src={data?.avatar} />
                </HStack>
            )}
            <Input
                value={data?.first || ''}
                placeholder={t('First name')}
                className={cls.input}
                onChange={onChangeFirstname}
                readonly={readonly}
            />
            <Input
                value={data?.lastname || ''}
                placeholder={t('Second name')}
                className={cls.input}
                onChange={onChangeLastname}
                readonly={readonly}
            />
            <Input
                value={data?.age}
                placeholder={t('Age')}
                className={cls.input}
                onChange={onChangeAge}
                readonly={readonly}
            />
            <Input
                value={data?.city}
                placeholder={t('City')}
                className={cls.input}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <Input
                value={data?.username}
                placeholder={t('Username')}
                className={cls.input}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Avatar link')}
                className={cls.input}
                onChange={onChangeAvatar}
                readonly={readonly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
};
