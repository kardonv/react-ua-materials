import { useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <p>Home</p>

                <button onClick={() => navigate('/order-summary', { replace: true })}>Place order</button>
            </div>

        </>
    )
}