import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CustomersPage.module.scss';

interface CustomersPageProps {
    className?: string;
}

// const reducers: ReducersList = {
//     customersPage: customersPageReducer,
// };

const CustomersPage = (props: CustomersPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div>Customers LIST</div>
    );
};

export default memo(CustomersPage);
