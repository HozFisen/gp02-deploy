import { Link } from "react-router";
import baseUrl from "../constant/url";
import axios from 'axios'
import Toastify from 'toastify-js'
import loadingGif from '../assets/loadingUpload.svg'
import { useState } from "react";

export default function Card({ product, fetchProducts }) {
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        try {
            const { data } = await axios.delete(`${baseUrl}/apis/products/products/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#34D399",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();

            fetchProducts()
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
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

    async function handleUpload(e) {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("file", e.target.files[0])

            const { data } = await axios.patch(`${baseUrl}/apis/products/products/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            fetchProducts()
        } catch (error) {
            console.log(error);

            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Main Card Container: Orange background, thick black border, sharp shadow, no rounded corners */}
            <div className="flex flex-col items-center bg-orange-400 border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] h-full transition duration-300 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)]">
                <div className="w-full">
                    <img
                        src={product.imgUrl}
                        alt="product image"
                        className="w-full h-48 object-cover border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer"
                    />
                </div>
                <div className="flex flex-col h-full w-full mt-4 p-2 bg-white border-2 border-black">
                    <b className="mt-1 text-xl uppercase font-extrabold text-black">
                        {product.name}
                    </b>
                    <hr className="border-t-2 border-black w-full my-2" />
                    <p className="line-clamp-4 text-gray-800">
                        {product.description}
                    </p>
                </div>
                {/* Separator for actions */}
                <hr className="border-t-4 border-black w-full my-4" />
                
                {/* Action Buttons Container */}
                <div className="flex justify-around w-full">
                    {/* Action Buttons: Block styling with hover/active states */}
                    <Link
                        to={`/detail/${product.id}`}
                        className="p-3 text-white bg-blue-600 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-blue-700 transition duration-100"
                    >
                        <i className="fa-solid fa-circle-info fa-lg" />
                    </Link>
                    
                    <a
                        onClick={handleDelete}
                        className="p-3 text-white bg-red-600 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-red-700 transition duration-100 cursor-pointer"
                    >
                        <i className="fa-solid fa-trash fa-lg" />
                    </a>
                    
                    <Link
                        to={`/edit/${product.id}`}
                        className="p-3 text-white bg-green-600 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-green-700 transition duration-100"
                    >
                        <i className="fa-solid fa-pen-to-square fa-lg" />
                    </Link>

                    {/* Upload button area */}
                    {loading ? (
                        <img src={loadingGif} className="w-10 h-10 border-2 border-black p-1 bg-white" alt="Loading" />
                    ) : (
                        <label className="p-3 text-black bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-gray-200 transition duration-100 cursor-pointer">
                            <i className="fa-solid fa-upload fa-lg" />
                            <input type="file" className="hidden" onChange={handleUpload} />
                        </label>
                    )}
                </div>
            </div>
        </>
    )
}