import UserForm from "../components/UserForm";
import Toastify from 'toastify-js'
import axios from 'axios'
import baseUrl from "../constant/url"
import { useNavigate } from "react-router";

export default function AddUser() {
    const navigate = useNavigate()

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/apis/auth/add-user`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            navigate("/")
            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#34D399",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        }
    }
    return (
        <>
            <UserForm nameProp={"Add User"} handleSubmit={handleSubmit} />
        </>
    )
}