import React from 'react';

interface TableFooterProps {
    totalProducts: number;
}

const TableFooter: React.FC<TableFooterProps> = ({ totalProducts }) => {
    return (
        <div>
            {totalProducts === 0 
                ? "Não há produtos disponíveis." 
                : `No total há ${totalProducts} ${totalProducts > 1 ? "produtos." : "produto."}`}
        </div>
    );
};

export default TableFooter;
