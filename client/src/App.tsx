import { useState, useEffect } from 'react';
import { DataTable, DataTableRowEditCompleteEvent, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { ProductService } from './service/ProductService';
import { Toolbar } from 'primereact/toolbar';

import TableHeader from './components/TableHeader';
import TableFooter from './components/TableFooter';
import ButtonsArea from './components/ButtonsArea';
import Modal from './components/Modal';

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export default function Tabela() {
  // Lista de Produtos
  const [products, setProducts] = useState<Product[]>([]);
  
  // Filtro de texto
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');

  // Condição para abrir o modal
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Status dos produtos
  const [statuses] = useState<string[]>(['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']);

  // Estado para armazenar a seleção de linhas
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getProductsWithOrders().then((data) => setProducts(data));
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const priceBodyTemplate = (product: Product) => {
    return formatCurrency(product.price);
  };

  const statusBodyTemplate = (product: Product) => {
    return <Tag value={product.inventoryStatus} severity={getSeverity(product.inventoryStatus)}></Tag>;
  };

  const getSeverity = (value: string) => {
    switch (value) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null;
    }
  };

  const handleRefresh = () => {
    console.log(filteredProducts);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    setFilteredProducts(products.filter((product: Product) => product.name.toLowerCase().includes(value.toLowerCase())));
  };

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    const updatedProducts = [...products];
    const { newData, index } = e;
    updatedProducts[index] = newData as Product;
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const textEditor = (options: ColumnEditorOptions) => {
    return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
  };

  const statusEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const priceEditor = (options: ColumnEditorOptions) => {
    return <InputNumber value={options.value} onValueChange={(e: InputNumberValueChangeEvent) => options.editorCallback!(e.value)} mode="currency" currency="USD" locale="en-US" />;
  };

  const onSelectionChange = (e: DataTableSelectionChangeEvent<Product>) => {
    setSelectedProducts(e.value);
  };

  return (
    <div>
      <div className="card p-fluid">
        <Toolbar className="mb-4" left={<ButtonsArea setOpenModal={setOpenModal} />}></Toolbar>
        <DataTable
          value={filterValue ? filteredProducts : products}
          header={<TableHeader filterValue={filterValue} filterOnChange={handleFilterChange} onRefresh={handleRefresh} />}
          footer={<TableFooter totalProducts={filterValue ? filteredProducts.length : products.length} />}
          tableStyle={{ minWidth: '60rem' }}
          paginator
          rows={5}
          editMode="row"
          dataKey="id"
          onRowEditComplete={onRowEditComplete}
          selection={selectedProducts}
          onSelectionChange={onSelectionChange}
          selectionMode="multiple" // Permite selecionar múltiplas linhas
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="code" header="Código" editor={(options) => textEditor(options)}></Column>
          <Column field="name" header="Nome" editor={(options) => textEditor(options)}></Column>
          <Column field="price" header="Preço" body={priceBodyTemplate} editor={(options) => priceEditor(options)}></Column>
          <Column field="category" header="Categoria" editor={(options) => textEditor(options)}></Column>
          <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)}></Column>
          <Column rowEditor headerStyle={{ width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
      </div>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
