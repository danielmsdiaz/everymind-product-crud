import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState } from 'react';

import { categories } from '../constants/categories';

type ModalProps = {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ openModal, setOpenModal}: ModalProps) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: null as string | null,
        price: 0,
        quantity: 0,
    });

    const modalFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={() => setOpenModal(false)} />
            <Button label="Save" icon="pi pi-check" onClick={() => handleSubmit()} />
        </>
    );

    const closeModal = () => {
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
            category: e.value,
        }));
    };

    const handleNumberChange = (id: keyof typeof product, value: number | null | undefined) => {
        setProduct((prevState) => ({
            ...prevState,
            [id]: value ?? 0,  // Certifique-se de que o valor seja 'number' ou '0' se for 'null' ou 'undefined'
        }));
    };

    const handleSubmit = () => {
        setOpenModal(false);
    };

    return (
        <Dialog visible={openModal} onHide={closeModal} footer={modalFooter} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid">
            <div className="field">
                <label htmlFor="name" className="font-bold">
                    Name
                </label>
                <InputText id="name" value={product.name} onChange={handleInputChange} />
            </div>
            <div className="field">
                <label htmlFor="description" className="font-bold">
                    Description
                </label>
                <InputTextarea id="description" value={product.description} onChange={handleInputChange} required rows={3} cols={20} />
            </div>

            <div className="field">
                <label htmlFor="category" className="font-bold">Category</label>
                <Dropdown id="category" value={product.category} options={categories} onChange={(e) => handleDropdownChange(e)} placeholder="Select a Category" />
            </div>

            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="price" className="font-bold">
                        Price
                    </label>
                    <InputNumber id="price" value={product.price} onValueChange={(e) => handleNumberChange('price', e.value)} />
                </div>
                <div className="field col">
                    <label htmlFor="quantity" className="font-bold">
                        Quantity
                    </label>
                    <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => handleNumberChange('quantity', e.value)} />
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;
