import ButtonCreate from "./ButtonCreate"

type ButtonsAreaProps = {
    // setProducts: React.Dispatch<React.SetStateAction<string>>;
    // setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonsArea = ({setOpenModal} : ButtonsAreaProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            <ButtonCreate setOpenModal={setOpenModal}/>
        </div>
    )
}

export default ButtonsArea