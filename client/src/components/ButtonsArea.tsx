import { ProductType } from "../types/productType";
import ButtonCreate from "./ButtonCreate"
import ButtonDelete from "./ButtonDelete"

type ButtonsAreaProps = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
    selectedProducts: ProductType[];
    setSelectedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const ButtonsArea = ({setOpenModal, setProducts, selectedProducts, setSelectedProducts} : ButtonsAreaProps) => {
    return (
        <div className="flex gap-3">
            <ButtonCreate setOpenModal={setOpenModal}/>
            <ButtonDelete setProducts={setProducts} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
        </div>
    )
}

export default ButtonsArea