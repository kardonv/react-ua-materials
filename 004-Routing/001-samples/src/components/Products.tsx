import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Products() {
    const navigate = useNavigate()
    
    // useEffect(() => {
    //     navigate('new');
    // }, []);


    return (
        <>
            <div>
                <input type='search' placeholder="Search products" />
            </div>

            <nav>
                <Link to='featured'>Featured</Link>
                <Link to='new'>New</Link>
            </nav>

            <Outlet />
        </>
    )
}