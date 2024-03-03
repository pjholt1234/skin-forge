import React from 'react';
import NavLink from "@/components/Navigation/NavLink";
import { cookies } from 'next/headers'
const NavBar = () => {
    const cookieStore = cookies()
    const token = cookieStore.get('token');

    const isLogged = token ? true : false;

    return (
        <nav className="w-full flex p-4 bg-primaryGrey border-b-4 border-blue-700">
            <div className="flex space-x-4">
                <NavLink href="/" label="Home" />
                <NavLink href="/crafting" label="Crafting" />
            </div>

            {isLogged ?
                <NavLink className="mr-0 ml-auto" href="/logout" label="Logout" /> :
                <NavLink className="mr-0 ml-auto" href="/login" label="Login" />
            }
        </nav>
    );
}

export default NavBar;