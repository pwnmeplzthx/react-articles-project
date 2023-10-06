import { useTranslation } from 'react-i18next';
import DataTable, { TableProps } from 'react-data-table-component';
import { ReactNode } from 'react';
import cls from './DataTable.module.scss';
import { FiltersContainer } from '@/pages/CustomersPage/ui/FiltersContainer/FiltersContainer';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface DataTableBaseProps {
    data: any;
    columns: any;
    isLoading: boolean;
    filtersContainer: ReactNode;
}

export function DataTableBase<T>(props: DataTableBaseProps): JSX.Element {
    const {
        data, columns, isLoading, filtersContainer,
    } = props;
    const { t } = useTranslation();

    // стилизация таблицы
    // https://github.com/jbetancur/react-data-table-component/blob/master/src/DataTable/styles.ts
    // общая дока
    // https://react-data-table-component.netlify.app/?path=/docs/api-typescript--page
    const customStyles = {
        table: {
            style: {
                display: 'table',
                // minHeight: '80vh',
                backgroundColor: 'var(--light-bg-redesigned)',
            },
        },
        head: {
            style: {
                backgroundColor: 'var(--dark-bg-redesigned)',
                color: 'var(--text-redesigned)',
            },
        },
        headRow: {
            style: {
                backgroundColor: 'var(--dark-bg-redesigned)',
                color: 'var(--text-redesigned)',
                borderBottomColor: 'var(--hint-redesigned)',
            },
        },
        headCells: {
            style: {
                backgroundColor: 'var(--dark-bg-redesigned)',
                color: 'var(--text-redesigned)',
                font: 'var(--font-m-redesigned)',
                fontWeight: 'bold',
            },
        },
        header: {
            style: {
                backgroundColor: 'var(--dark-bg-redesigned)',
                color: 'var(--text-redesigned)',
            },
        },
        subHeader: {
            style: {
                backgroundColor: 'var(--dark-bg-redesigned)',
                color: 'var(--text-redesigned)',
                // display: 'block',
            },
        },
        rows: {
            style: {
                minHeight: '72px', // override the row height
                backgroundColor: 'var(--light-bg-redesigned)',
                color: 'var(--text-redesigned)',
                '&:not(:last-of-type)': {
                    borderBottomColor: 'var(--hint-redesigned)',
                },
            },
            highlightOnHoverStyle: {
                color: 'var(--text-redesigned)',
                backgroundColor: 'var(--dark-bg-redesigned)',
                transitionDuration: '0.15s',
                transitionProperty: 'background-color',
                background: 'linear-gradient(89.97deg, rgb(94 211 243 / 30%) 1.15%, rgb(94 211 243 / 0%) 99.97%)',
                position: 'relative',
                borderBottomColor: 'var(--icon-redesigned)',
                outlineColor: 'var(--icon-redesigned)',
            },
        },
        responsiveWrapper: {
            style: {
                height: '80vh',
            },
        },
        pagination: {
            style: {
                color: 'var(--icon-redesigned)',
                fill: 'var(--icon-redesigned)',
                backgroundColor: 'var(--dark-bg-redesigned)',
                borderTopColor: 'var(--hint-redesigned)',
            },
            pageButtonsStyle: {
                color: 'var(--icon-redesigned)',
                fill: 'var(--icon-redesigned)',
                backgroundColor: 'transparent',
                '&:disabled': {
                    cursor: 'unset',
                },
            },
        },
        noData: {
            style: {
                display: 'flex',
                minHeight: '80vh',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-redesigned)',
                backgroundColor: 'var(--light-bg-redesigned)',
            },
        },
        progress: {
            style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-redesigned)',
                backgroundColor: 'var(--light-bg-redesigned)',
            },
        },
    };

    const paginationComponentOptions = {
        rowsPerPageText: t('Данных на странице'),
        rangeSeparatorText: t('из'),
    };

    return (
        <DataTable
            pagination
            paginationServer
            paginationTotalRows={20}
            paginationComponentOptions={paginationComponentOptions}
            // dense
            highlightOnHover
            customStyles={customStyles}
            data={data}
            columns={columns}
            fixedHeader
            subHeader
            subHeaderComponent={filtersContainer}
            progressPending={isLoading}
            progressComponent={<Skeleton height="80vh" />}
        />
    );
}
