import { ProductType } from "../types/productType";
import ButtonCreate from "./ButtonCreate"
import ButtonDelete from "./ButtonDelete"

type ButtonsAreaProps = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
    selectedProducts: ProductType[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
    setSelectedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const ButtonsArea = ({setFilteredProducts, setOpenModal, setProducts, selectedProducts, setSelectedProducts} : ButtonsAreaProps) => {
    return (
        <div className="flex gap-3">
            <ButtonCreate setOpenModal={setOpenModal}/>
            <ButtonDelete setFilteredProducts={setFilteredProducts} setProducts={setProducts} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
        </div>
    )
}

export default ButtonsArea