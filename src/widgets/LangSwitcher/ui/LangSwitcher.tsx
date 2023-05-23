import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button';

interface LangSwitcherProps {
    className?: string,
    short?: boolean
}

export const LangSwitcher = (props: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const { className, short } = props;

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={toggleLang}
            className={classNames('', [className])}
        >
            {short ? t('shortLang') : t('button-toggleLang')}
        </Button>
    );
};
