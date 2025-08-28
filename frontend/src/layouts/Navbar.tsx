import { NavLink } from "react-router-dom"

export const Navbar =()=>{
    return(
        <header className="absolute top-0 w-full p-8 shadow-xl text-cyan-500">
            <nav>
                <ul className="flex justify-center gap-5">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/login">LogIn</NavLink></li>
                    <li><NavLink to="/registration">Registration</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}