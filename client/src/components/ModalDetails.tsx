import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { ProductType } from '../types/productType';
import { getSeverity } from '../constants/severities';

type ModalDetailsProps = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    product: ProductType;
};

const ModalDetails = ({ openModal, setOpenModal, product }: ModalDetailsProps) => {
    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <Dialog 
            visible={openModal} 
            onHide={closeModal} 
            style={{ width: '32rem' }} 
            breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
            header="Detalhes do Produto" 
            modal 
            className="p-fluid"
        >
            <div className="p-d-flex p-flex-wrap p-ai-start p-jc-between">
                <div className="p-m-4 p-col-12 p-md-6">
                    <div className="field">
                        <label htmlFor="id" className="font-bold">ID:</label>
                        <div id="id">{product.id}</div>
                    </div>
                </div>
                <div className="p-m-4 p-col-12 p-md-6">
                    <div className="field">
                        <label htmlFor="codigo" className="font-bold">Código:</label>
                        <div id="codigo">{product.codigo}</div>
                    </div>
                </div>
                <div className="p-m-4 p-col-12 p-md-6">
                    <div className="field">
                        <label htmlFor="nome" className="font-bold">Nome:</label>
                        <div id="nome">{product.nome}</div>
                    </div>
                </div>
                <div className="p-m-4 p-col-12 p-md-6">
                    <div className="field">
                        <label htmlFor="descricao" className="font-bold">Descrição:</label>
                        <div id="descricao">{product.descricao}</div>
                    </div>
                </div>
                <div className="p-m-4 p-col-12 p-md-6">
                    <div className="field">
                        <label htmlFor="categoria" className="font-bold">Categoria:</label>
                        <div id="categoria">{product.categoria}</div>
                    </div>
                </div>
                <div className="p-m-4 p-col-12 p-md-6">
                    <div className="field">
                        <label htmlFor="preco" className="font-bold">Preço:</label>
                        <div id="preco">{`R$ ${product.preco}`}</div>
                    </div>
                </div>
                <div className="p-m-4 p-col-12 p-md-6">
                    <div className="field">
                        <label htmlFor="quantidade" className="font-bold">Quantidade:</label>
                        <div id="quantidade">{product.quantidade}</div>
                    </div>
                </div>
                <div className="p-m-4 p-col-12 p-md-6">
                    <div className="field">
                        <label htmlFor="status" className="font-bold">Status:</label>
                        <div id="status" className="mt-2">
                            <Tag value={product.status?.replace("_", " ")} severity={getSeverity(product.status as string)}></Tag>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalDetails;
