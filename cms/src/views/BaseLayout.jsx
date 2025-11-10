import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function BaseLayout() {
    return (
        <>
            <div className="p-5">
                <Navbar />
                <Outlet />
            </div>

        </>
    )
}