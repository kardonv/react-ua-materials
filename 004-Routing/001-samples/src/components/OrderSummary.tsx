import { useNavigate } from "react-router-dom"

export default function OrderSummary() {
    const navigate = useNavigate();
    
    return (
        <>
            <div>Order confirmed!</div>
            {/* <button onClick={() => navigate('/')}>Go back</button> */}
            <button onClick={() => navigate(-1)}>Go back</button>
        </>
    )
}