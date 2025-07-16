import { Outlet, useSearchParams } from "react-router-dom";

export default function Users() {
    const [searchParams, setSearchparams] = useSearchParams();
    console.log('Search params: ', searchParams);

    const showActiveUsers = searchParams.get('filter') === 'active';

    return (
        <div>
            <ul>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
            </ul>

            <Outlet />

            <div>
                <button onClick={() => setSearchparams({ filter: 'active' })}>Active Users</button>
                <button onClick={() => setSearchparams({})}>Reset Filter</button>
            </div>

            {
                showActiveUsers ? <h3>Showing active users</h3> : <h3>Showing all users</h3>
            }
        </div>
    )
}