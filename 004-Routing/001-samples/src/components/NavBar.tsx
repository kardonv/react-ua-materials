import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="primaryNav">
            {/* 1. */}
            {/* <a href='/'>Home</a>
            <a href='/about'>About</a> */}

            {/* 2 */}
            {/* <Link to='/'>Home</Link>
            <Link to='/about'>About</Link> */}

            {/* 3. */}
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/products'>Products</NavLink>
            <NavLink to='/users'>Users</NavLink>
        </nav>
    )
}