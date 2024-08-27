import { Button } from "primereact/button"

type CreateProps = {
    // setProducts: React.Dispatch<React.SetStateAction<string>>;
    // setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonCreate = ({setOpenModal}: CreateProps) => {

    const openNew = () => {
        // setProduct();
        // setSubmitted(false);
        setOpenModal(true);
    };

    return (
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
    )
}

export default ButtonCreate