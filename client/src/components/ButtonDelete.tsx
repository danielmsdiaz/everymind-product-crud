import { Button } from "primereact/button"
import { ProductType } from "../types/productType";
import { apiService } from "../service/ProductService";

type DeleteProps = {
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  selectedProducts: ProductType[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const ButtonDelete = ({ setProducts, selectedProducts, setSelectedProducts }: DeleteProps) => {

  const handleDeleteProduct = async () => {
    try {
      if(selectedProducts.length){
        const ids = selectedProducts.map(product => product.id);
        await apiService.deleteProducts(ids as number[]);
        if (ids) {
          setProducts(prevProducts => prevProducts.filter(product => !ids.includes(product.id)));
          setSelectedProducts([]);
        }
      }
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };


  return (
    <Button onClick={handleDeleteProduct} label="Apagar" icon="pi pi-trash" severity="danger" />
  )
}

export default ButtonDelete