import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = (props: PageErrorProps) => {
    const { t } = useTranslation();
    const { className } = props;

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.pageError, [className])}>
            <p>{t('Somethink wrong')}</p>
            <Button onClick={reloadPage}>
                {t('Reload page')}
            </Button>
        </div>
    );
};
