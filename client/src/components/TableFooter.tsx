// src/components/TableFooter.tsx
import React from 'react';

interface TableFooterProps {
    totalProducts: number;
}

const TableFooter: React.FC<TableFooterProps> = ({ totalProducts }) => {
    return <div>No total há {totalProducts} produtos.</div>;
};

export default TableFooter;
