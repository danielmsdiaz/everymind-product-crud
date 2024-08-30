import { Button } from "primereact/button"
import { ProductType } from "../types/productType";
import { apiService } from "../service/ProductService";
import { useMessage } from '../context/MessageContext';


type DeleteProps = {
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  selectedProducts: ProductType[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const ButtonDelete = ({ setProducts, selectedProducts, setSelectedProducts }: DeleteProps) => {
  const {showSuccess, showError} = useMessage();

  const handleDeleteProduct = async () => {
    try {
      if(selectedProducts.length){
        const ids = selectedProducts.map(product => product.id);
        await apiService.deleteProducts(ids as number[]);
        if (ids) {
          setProducts(prevProducts => prevProducts.filter(product => !ids.includes(product.id)));
          setSelectedProducts([]);
          if(selectedProducts.length == 1){
            return showSuccess("Sucesso", `O produto ${selectedProducts[0].nome} foi removido com sucesso`)
          }
          return showSuccess("Sucesso", `Os produtos foram removidos com sucesso!`)
        }
      }
      return showError("Erro", "Selecione ao menos 1 produto para remover!");
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };


  return (
    <Button onClick={handleDeleteProduct} label="Apagar" icon="pi pi-trash" severity="danger" />
  )
}

export default ButtonDelete