import { NavLink, useNavigate } from "react-router"; 

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <>
            {/* Main Nav: Bright background, strong border, large block shadow, no rounded corners */}
            <nav className="sticky top-0 z-10 p-4 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex justify-between items-center font-mono">
                <div className="flex space-x-2">
                    {/* NavLink styling: Block-shaped, hover effect, active state */}
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "block px-4 py-2 text-xl font-extrabold bg-black text-yellow-400 border-2 border-black"
                                : "block px-4 py-2 text-xl font-extrabold text-black bg-white border-2 border-black transition duration-150 hover:bg-gray-200"
                        }>
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        to="/add"
                        className={({ isActive }) =>
                            isActive
                                ? "block px-4 py-2 text-xl font-extrabold bg-black text-yellow-400 border-2 border-black"
                                : "block px-4 py-2 text-xl font-extrabold text-black bg-white border-2 border-black transition duration-150 hover:bg-gray-200"
                        }>
                        <span>Add Product</span>
                    </NavLink>
                                        <NavLink
                        to="/add-user"
                        className={({ isActive }) =>
                            isActive
                                ? "block px-4 py-2 text-xl font-extrabold bg-black text-yellow-400 border-2 border-black"
                                : "block px-4 py-2 text-xl font-extrabold text-black bg-white border-2 border-black transition duration-150 hover:bg-gray-200"
                        }>
                        <span>Add User</span>
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            isActive
                                ? "block px-4 py-2 text-xl font-extrabold bg-black text-yellow-400 border-2 border-black"
                                : "block px-4 py-2 text-xl font-extrabold text-black bg-white border-2 border-black transition duration-150 hover:bg-gray-200"
                        }>
                        <span>View Categories</span>
                    </NavLink>
                </div>
                {/* Logout Button: High contrast, block shadow, prominent hover/active state */}
                <a
                    onClick={handleLogout}
                    className="block px-6 py-2 text-xl font-extrabold text-white bg-red-600 border-2 border-black cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition duration-100 hover:bg-red-700">
                    <span>Logout</span>
                </a>
            </nav>
        </>
    )
}