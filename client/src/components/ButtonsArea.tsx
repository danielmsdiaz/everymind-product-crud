import ButtonCreate from "./ButtonCreate"
import ButtonDelete from "./ButtonDelete"

type ButtonsAreaProps = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonsArea = ({setOpenModal} : ButtonsAreaProps) => {
    return (
        <div className="flex gap-3">
            <ButtonCreate setOpenModal={setOpenModal}/>
            <ButtonDelete/>
        </div>
    )
}

export default ButtonsArea