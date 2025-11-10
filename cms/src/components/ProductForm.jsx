import { useEffect, useState } from "react"
import Toastify from 'toastify-js'
import axios from 'axios'
import baseUrl from "../constant/url"
import Button from "./Button"

export default function ProductForm({ nameProp, handleSubmit, product }) {
    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imgUrl: "",
        categoryId: 0
    })

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imgUrl: product.imgUrl,
                categoryId: product.categoryId
            })
        }
    }, [product])

    function handleForm(e, fieldName) {
        if (fieldName === 'price' || fieldName === 'stock' || fieldName === 'categoryId') {
            setForm((oldValue) => {
                return {
                    ...oldValue,
                    [fieldName]: +e.target.value
                }
            })
        } else {
            setForm((oldValue) => {
                return {
                    ...oldValue,
                    [fieldName]: e.target.value
                }
            })
        }
    }

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/products/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            setCategories(data.data)
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

    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <>
            <form className="p-10 mt-5 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-red-400" onSubmit={(e) => handleSubmit(e, form)}>
                <h1 className="text-2xl font-bold text-center mb-4">{nameProp}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="font-bold">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => handleForm(e, "name")}
                            value={form.name}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Description</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Description"
                            className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => handleForm(e, "description")}
                            value={form.description}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Price</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => handleForm(e, "price")}
                            value={form.price}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Stock</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Stock"
                            className="bg-white g w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => handleForm(e, "stock")}
                            value={form.stock}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Image (URL)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Image URL"
                            className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => handleForm(e, "imgUrl")}
                            value={form.imgUrl}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Category</span>
                        </label>
                        <select
                            className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            name="category"
                            onChange={(e) => handleForm(e, "categoryId")}
                            value={form.categoryId}
                        >
                            {categories.map((c) => {
                                return (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <Button nameProp={nameProp} />
                </div>
            </form>
        </>
    )
}