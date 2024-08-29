import { Button } from "primereact/button"

type CreateProps = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonCreate = ({setOpenModal}: CreateProps) => {

    const openNew = () => {
        setOpenModal(true);
    };

    return (
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
    )
}

export default ButtonCreate