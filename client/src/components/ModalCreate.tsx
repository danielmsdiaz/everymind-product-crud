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
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

const ModalCreate = ({ setProducts, openModal, setOpenModal }: ModalProps) => {
    const [product, setProduct] = useState<ProductType>(productTypeModel);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const closeModal = () => {
        setProduct(productTypeModel);
        setErrors({});
        setOpenModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        setErrors((prevState) => ({
            ...prevState,
            [id]: !value.trim(),
        }));
    };

    const handleDropdownChange = (e: { value: string | null }) => {
        setProduct((prevState) => ({
            ...prevState,
            categoria: e.value,
        }));
        setErrors((prevState) => ({
            ...prevState,
            categoria: !e.value,
        }));
    };

    const handleNumberChange = (id: keyof typeof product, value: number | null | undefined) => {
        setProduct((prevState) => ({
            ...prevState,
            [id]: value ?? 0,
        }));
        setErrors((prevState) => ({
            ...prevState,
            [id]: value == null || value <= 0,
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

    const isFormValid = () => {
        return Object.values(errors).every(error => !error) && 
               product.nome.trim() !== '' &&
               product.descricao.trim() !== '' &&
               product.categoria !== null &&
               product.preco > 0 &&
               product.quantidade as number > 0;
    };

    const modalFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={closeModal} />
            <Button label="Save" icon="pi pi-check" onClick={() => handleSubmit()} disabled={!isFormValid()} />
        </>
    );

    return (
        <Dialog visible={openModal} onHide={closeModal} footer={modalFooter} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalhes do Produto" modal className="p-fluid">
            <div className="field">
                <label htmlFor="nome" className="font-bold">
                    Nome
                </label>
                <InputText id="nome" value={product.nome} onChange={handleInputChange} className={errors.nome ? 'p-invalid' : ''} />
                <small id="nome-help">Insira o nome do produto.</small>
            </div>
            <div className="field">
                <label htmlFor="descricao" className="font-bold">
                    Descrição
                </label>
                <InputTextarea id="descricao" value={product.descricao} onChange={handleInputChange} required rows={3} cols={20} className={errors.descricao ? 'p-invalid' : ''} />
                <small id="descricao-help">Insira uma descrição detalhada do produto.</small>
            </div>

            <div className="field">
                <label htmlFor="categoria" className="font-bold">Categoria</label>
                <Dropdown id="categoria" value={product.categoria} options={categories} onChange={(e) => handleDropdownChange(e)} placeholder="Selecione uma categoria" className={errors.categoria ? 'p-invalid' : ''} />
                <small id="categoria-help">Selecione uma categoria para o produto.</small>
            </div>

            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="preco" className="font-bold">
                        Preço
                    </label>
                    <InputNumber id="preco" value={product.preco} onValueChange={(e) => handleNumberChange('preco', e.value)} className={errors.preco ? 'p-invalid' : ''} />
                    <small id="preco-help">Insira o valor do produto.</small>
                </div>
                <div className="field col">
                    <label htmlFor="quantidade" className="font-bold">
                        Quantidade
                    </label>
                    <InputNumber id="quantidade" value={product.quantidade} onValueChange={(e) => handleNumberChange('quantidade', e.value)} className={errors.quantidade ? 'p-invalid' : ''} />
                    <small id="quantidade-help">Insira a quantidade do produto.</small>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalCreate;
