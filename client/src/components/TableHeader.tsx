import React from 'react';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

interface TableHeaderProps {
    filterValue: string;
    filterOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ filterValue, filterOnChange }) => {
    return (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Produtos</span>
            <div className="flex align-items-center gap-2">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText
                        value={filterValue}
                        onChange={filterOnChange}
                        placeholder="Filtro de Busca"
                    />
                </IconField>
            </div>
        </div>
    );
};

export default TableHeader;
