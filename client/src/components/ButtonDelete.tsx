import { Button } from "primereact/button"
import { ProductType } from "../types/productType";

type DeleteProps = {
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  selectedProducts: ProductType[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const ButtonDelete = ({setProducts, selectedProducts, setSelectedProducts}: DeleteProps) => {

  const handleDeleteProduct = () => {
    console.log(selectedProducts);
  }

  return (
    <Button onClick={handleDeleteProduct} label="Delete" icon="pi pi-trash" severity="danger"/>
  )
}

export default ButtonDelete