import SweetAlert from "react-bootstrap-sweetalert";

export default function CustomAlert(props){
    const {
        flag,
        callback,
        callbackParameter,
        title
    } = props
    return (flag ?
                <SweetAlert title={title}
                    onConfirm={()=> callback(callbackParameter)} style={{
                        backgroundColor: 'black',
                        color: 'white'
                    }} /> : <></>
    )
}