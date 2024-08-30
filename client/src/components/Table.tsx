import { useState, useEffect } from 'react';
//@ts-expect-error error
import { DataTable, DataTableRowEditCompleteEvent, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import ButtonsArea from './ButtonsArea';
import ModalCreate from './ModalCreate';
import ModalDetails from './ModalDetails';

import { apiService } from '../service/ProductService';
import { ProductType } from '../types/productType';
import { categories } from '../constants/categories';
import { useMessage } from '../context/MessageContext';

const Table = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const {showSuccess, showError} = useMessage();

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


  const priceBodyTemplate = (product: ProductType) => {
    return `R$ ${product.preco}`
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);

    setFilteredProducts(products.filter((product: ProductType) => {
      const codigo = product.codigo as string;
      const categoria = product.categoria as string;

      const nomeMatch = product.nome.toLowerCase().includes(value);
      const codigoMatch = codigo.toLowerCase().includes(value);
      const categoriaMatch = categoria.toLowerCase().includes(value);

      return nomeMatch || codigoMatch || categoriaMatch;
    }));
  };


  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    try {
      const res = await apiService.updateProduct(e.newData as ProductType);
      if (res.product && res.product.id) {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.id === res.product.id ? { ...product, ...res.product } : product
          )
        );
        return showSuccess("Sucesso!", `O produto ${res.product.nome} foi editado com sucesso!`)
      }
    } catch (err) {
      console.log(err);
      return showError("Erro!", `O produto não foi editado com sucesso!`)
    }
  };

  const textEditor = (options: ColumnEditorOptions) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const numericValue = Number(value);

      if (options.field === "quantidade") {
        if (numericValue > 0 || value === '') {
          options.editorCallback!(value);
        }
      } else {
        options.editorCallback!(value);
      }
    };

    return (
      <InputText
        type={options.field === "quantidade" ? "number" : "text"}
        value={options.value}
        onChange={handleChange}
      />
    );
  };

  const priceEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e: InputNumberValueChangeEvent) => options.editorCallback!(e.value)}
        mode="currency"
        currency="BRL"
        locale="pt-BR"
        min={0}
        step={1}
      />
    );
  };

  const categoryEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={categories}
        onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
        placeholder="Select a Category"
      />
    );
  };

  const onSelectionChange = (e: DataTableSelectionChangeEvent<ProductType>) => {
    setSelectedProducts(e.value);
  };

  const handleDetailsClick = (product: ProductType) => {
    setSelectedProduct(product);
    setOpenDetailsModal(true);
  };

  return (
    <div>
      <div className="card p-fluid">
        <Toolbar className="mb-4" left={<ButtonsArea setProducts={setProducts} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} setOpenModal={setOpenModal} />}></Toolbar>
        <DataTable
          value={filterValue ? filteredProducts : products}
          header={<TableHeader filterValue={filterValue} filterOnChange={handleFilterChange} />}
          footer={<TableFooter totalProducts={filterValue ? filteredProducts.length : products.length} />}
          tableStyle={{ minWidth: '60rem' }}
          paginator
          rows={5}
          editMode="row"
          dataKey="id"
          onRowEditComplete={onRowEditComplete}
          onSelectionChange={onSelectionChange}
          selection={selectedProducts}
          selectionMode="checkbox"
          emptyMessage="Não possui registros na tabela"
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="codigo" header="Código"></Column>
          <Column field="nome" header="Nome" editor={(options) => textEditor(options)}></Column>
          <Column field="descricao" header="Descrição" editor={(options) => textEditor(options)}></Column>
          <Column field="quantidade" header="Quantidade" editor={(options) => textEditor(options)}></Column>
          <Column field="preco" header="Preço" body={priceBodyTemplate} editor={(options) => priceEditor(options)}></Column>
          <Column field="categoria" header="Categoria" editor={(options) => categoryEditor(options)}></Column>
          <Column rowEditor headerStyle={{ width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

          <Column
            headerStyle={{ width: '12rem' }}
            body={(rowData: ProductType) => (
              <div className="p-d-flex p-ai-center">
                <Button icon="pi pi-info-circle" className="p-button-text p-ml-2" onClick={() => handleDetailsClick(rowData)} />
              </div>
            )}
          />
        </DataTable>
      </div>
      <ModalCreate setProducts={setProducts} openModal={openModal} setOpenModal={setOpenModal} />
      {selectedProduct && (
        <ModalDetails
          openModal={openDetailsModal}
          setOpenModal={setOpenDetailsModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

export default Table