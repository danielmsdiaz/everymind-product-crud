import { Button } from "primereact/button"

type DeleteProps = {
    confirmDeleteSelected: () => void
}

const ButtonDelete = ({confirmDeleteSelected}: DeleteProps) => {
  return (
    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}/>
  )
}

export default ButtonDelete