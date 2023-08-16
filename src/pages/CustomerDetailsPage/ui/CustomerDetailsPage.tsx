import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CustomerDetailsPage.module.scss';

interface CustomerDetailsPageProps {
    className?: string;
}

// const reducers: ReducersList = {
//     customersPage: customersPageReducer,
// };

const CustomerDetailsPage = (props: CustomerDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div>CustomerDetails PAGE</div>
    );
};

export default memo(CustomerDetailsPage);
