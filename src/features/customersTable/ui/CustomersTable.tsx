import {
    ColumnDef, Row, createColumnHelper, createTable, flexRender, getCoreRowModel, useReactTable,
} from '@tanstack/react-table';
import { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Customer } from '@/entities/Customer';
import { getCustomers } from '@/pages/CustomersPage/model/slices/customersPageSlice';
import cls from './CustomersTable.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface CustomersTableProps {
    className?: string;
}

const columnHelper = createColumnHelper<Customer>();

const columns = [
    columnHelper.accessor('name', {
        header: () => <Text title="ФИО" className={cls.text} />,
        cell: (info) => <Text text={info.getValue()} />,
        // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.phone, {
        id: 'phone',
        cell: (info) => <Text text={info.getValue()} />,
        header: () => <Text title="Телефон" className={cls.text} />,
        size: 10,
        // footer: (info) => <Text text={info.column.id} />,
    }),
    columnHelper.accessor((row) => row.email, {
        id: 'email',
        cell: (info) => <Text text={info.getValue()} />,
        header: () => <Text title="Почта" className={cls.text} />,
        // footer: (info) => <Text text={info.column.id} />,
    }),
];

// eslint-disable-next-line consistent-return
const getRowStyles = (row: Row<Customer>) => {
    if (row.original.is_conflict === true) {
        return {
            background: 'var(--error-card)',
        };
    }
};

export const CustomersTable = memo((props: CustomersTableProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const data = useSelector(getCustomers.selectAll);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-2">
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            style={typeof getRowStyles === 'function' ? getRowStyles(row) : {}}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="h-4" />
        </div>
    );
});
