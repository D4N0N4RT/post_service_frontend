import { useAppSelector } from "../../Store/Hooks/redux"
import "./ErrorItem.css"

const ErrorItem = () => {

    const {errorData} = useAppSelector((store) => store.userReducer);

    if (errorData !== '') {
        return (
            <div className="error">
                {errorData}
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default ErrorItem;