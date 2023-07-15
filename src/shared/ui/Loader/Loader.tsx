import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string
}

export const Loader = (props: LoaderProps) => {
    const { className } = props;
    return (
        <div className={classNames('lds-ripple', [className])}>
            <div />
            <div />
        </div>
    );
};
