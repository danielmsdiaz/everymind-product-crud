import { useState, useEffect } from 'react';
import { DataTable, DataTableRowEditCompleteEvent, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';

import TableHeader from './components/TableHeader';
import TableFooter from './components/TableFooter';
import ButtonsArea from './components/ButtonsArea';
import Modal from './components/Modal';

import { apiService } from './service/ProductService';
import { ProductType } from './types/productType';
import { getSeverity } from './constants/severities';

export default function Tabela() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [statuses] = useState<string[]>(['EM_ESTOQUE', 'POUCO_ESTOQUE', 'FORA_DE_ESTOQUE']);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await apiService.getProducts();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Dados inesperados:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const priceBodyTemplate = (product: ProductType) => {
    return formatCurrency(product.preco);
  };

  const statusBodyTemplate = (product: ProductType) => {
    return <Tag value={product.status?.replace("_", " ")} severity={getSeverity(product.status as string)}></Tag>;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    setFilteredProducts(products.filter((product: ProductType) => product.nome.toLowerCase().includes(value.toLowerCase())));
  };

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    const updatedProducts = [...products];
    const { newData, index } = e;
    updatedProducts[index] = newData as ProductType;
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

  const onSelectionChange = (e: DataTableSelectionChangeEvent<ProductType>) => {
    setSelectedProducts(e.value);
  };

  return (
    <div>
      <div className="card p-fluid">
        <Toolbar className="mb-4" left={<ButtonsArea setOpenModal={setOpenModal} />}></Toolbar>
        <DataTable
          value={filterValue ? filteredProducts : products}
          header={<TableHeader onRefresh={() => {alert("asd")}} filterValue={filterValue} filterOnChange={handleFilterChange} />}
          footer={<TableFooter totalProducts={filterValue ? filteredProducts.length : products.length} />}
          tableStyle={{ minWidth: '60rem' }}
          paginator
          rows={5}
          editMode="row"
          dataKey="id"
          onRowEditComplete={onRowEditComplete}
          selection={selectedProducts}
          onSelectionChange={onSelectionChange}
          selectionMode="multiple"
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="codigo" header="Código" editor={(options) => textEditor(options)}></Column>
          <Column field="nome" header="Nome" editor={(options) => textEditor(options)}></Column>
          <Column field="preco" header="Preço" body={priceBodyTemplate} editor={(options) => priceEditor(options)}></Column>
          <Column field="categoria" header="Categoria" editor={(options) => textEditor(options)}></Column>
          <Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)}></Column>
          <Column rowEditor headerStyle={{ width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
      </div>
      <Modal setProducts={setProducts} openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
