import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState } from 'react';

import { categories } from '../constants/categories';
import { apiService } from '../service/ProductService';
import { ProductType, productTypeModel } from '../types/productType';

type ModalProps = {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

const Modal = ({setProducts, openModal, setOpenModal }: ModalProps) => {
    const [product, setProduct] = useState<ProductType>(productTypeModel);

    const closeModal = () => {
        setProduct(productTypeModel)
        setOpenModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleDropdownChange = (e: { value: string | null }) => {
        setProduct((prevState) => ({
            ...prevState,
            categoria: e.value,
        }));
    };

    const handleNumberChange = (id: keyof typeof product, value: number | null | undefined) => {
        setProduct((prevState) => ({
            ...prevState,
            [id]: value ?? 0,  // Certifique-se de que o valor seja 'number' ou '0' se for 'null' ou 'undefined'
        }));
    };

    const handleSubmit = async () => {
        try {
            const res = await apiService.postProduct(product);
            setProducts(prevProducts => [...prevProducts, res]);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    const modalFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={closeModal} />
            <Button label="Save" icon="pi pi-check" onClick={() => handleSubmit()} />
        </>
    );

    return (
        <Dialog visible={openModal} onHide={closeModal} footer={modalFooter} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid">
            <div className="field">
                <label htmlFor="nome" className="font-bold">
                    Nome
                </label>
                <InputText id="nome" value={product.nome} onChange={handleInputChange} />
            </div>
            <div className="field">
                <label htmlFor="descricao" className="font-bold">
                    Descrição
                </label>
                <InputTextarea id="descricao" value={product.descricao} onChange={handleInputChange} required rows={3} cols={20} />
            </div>

            <div className="field">
                <label htmlFor="categoria" className="font-bold">Categoria</label>
                <Dropdown id="categoria" value={product.categoria} options={categories} onChange={(e) => handleDropdownChange(e)} placeholder="Select a Category" />
            </div>

            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="preco" className="font-bold">
                        Preço
                    </label>
                    <InputNumber id="preco" value={product.preco} onValueChange={(e) => handleNumberChange('preco', e.value)} />
                </div>
                <div className="field col">
                    <label htmlFor="quantidade" className="font-bold">
                        Quantidade
                    </label>
                    <InputNumber id="quantidade" value={product.quantidade} onValueChange={(e) => handleNumberChange('quantidade', e.value)} />
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;
