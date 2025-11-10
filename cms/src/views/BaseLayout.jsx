import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Login from "./Login";

export default function BaseLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <>
            <div className="p-5">
                <Navbar />
                <Outlet />
            </div>

        </>
    )
}
