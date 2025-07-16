import { useParams } from "react-router-dom"



export default function UserDetails() {
    const params = useParams();

    console.log('Params: ', params)

    return (
        <div>Details about user {params.userId}</div>
    )
}