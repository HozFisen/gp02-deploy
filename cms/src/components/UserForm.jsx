import { useEffect, useState } from "react"
import Toastify from 'toastify-js'
import axios from 'axios'
import baseUrl from "../constant/url"
import Button from "./Button"
import { useNavigate } from "react-router"; // Assuming you need navigation after form submission

// NOTE: This component is now named UserForm instead of ProductForm
export default function UserForm({ nameProp, handleSubmit, user }) {
    const navigate = useNavigate(); // Added for a potential redirect

    // 1. Updated form state for user fields
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "Staff", // Default role
        phoneNumber: "",
        address: ""
    })

    // Roles for the select dropdown
    const roles = ['Admin', 'Staff'];

    // 2. Updated useEffect to populate form if a 'user' object is passed (for editing)
    useEffect(() => {
        if (user) {
            setForm({
                username: user.username,
                email: user.email,
                password: "", // Never pre-fill password for security
                role: user.role,
                phoneNumber: user.phoneNumber,
                address: user.address,
            })
        }
    }, [user])

    // 3. Updated handleForm to handle user fields
    function handleForm(e, fieldName) {
        setForm((oldValue) => {
            return {
                ...oldValue,
                [fieldName]: e.target.value
            }
        })
    }

    // Removed fetchCategories since we are using static 'roles' now.

    return (
        <>
            {/* Form Container: Blue background, thick border, sharp shadow, no rounded corners */}
            <form className="p-10 mt-5 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-blue-300 font-mono max-w-4xl mx-auto" onSubmit={(e) => handleSubmit(e, form)}>
                {/* Title: Uppercase, bold, large block-like font */}
                <h1 className="text-3xl font-extrabold text-center mb-6 uppercase border-b-4 border-black pb-2">
                    {nameProp}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username Input */}
                    <div>
                        <label className="block mb-1">
                            <span className="font-extrabold text-lg text-black bg-white px-2 border-2 border-black">USERNAME</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. user_alpha"
                            // Input Styling: High contrast, thick border, large shadow, white background, no rounded corners
                            className="bg-white w-full px-4 py-3 border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition duration-100 focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none"
                            onChange={(e) => handleForm(e, "username")}
                            value={form.username}
                        />
                    </div>
                    {/* Email Input */}
                    <div>
                        <label className="block mb-1">
                            <span className="font-extrabold text-lg text-black bg-white px-2 border-2 border-black">EMAIL</span>
                        </label>
                        <input
                            type="email"
                            placeholder="user@example.com"
                            className="bg-white w-full px-4 py-3 border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition duration-100 focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none"
                            onChange={(e) => handleForm(e, "email")}
                            value={form.email}
                        />
                    </div>
                    {/* Password Input */}
                    <div>
                        <label className="block mb-1">
                            <span className="font-extrabold text-lg text-black bg-white px-2 border-2 border-black">PASSWORD</span>
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="bg-white w-full px-4 py-3 border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition duration-100 focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none"
                            onChange={(e) => handleForm(e, "password")}
                            value={form.password}
                        />
                    </div>
                    {/* Role Selection */}
                    <div>
                        <label className="block mb-1">
                            <span className="font-extrabold text-lg text-black bg-white px-2 border-2 border-black">ROLE</span>
                        </label>
                        <select
                            // Select Styling: Uses Tailwind styling similar to inputs for consistency
                            className="bg-white w-full px-4 py-3 border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition duration-100 appearance-none focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none"
                            name="role"
                            onChange={(e) => handleForm(e, "role")}
                            value={form.role}
                        >
                            {roles.map((r) => {
                                return (
                                    <option value={r} key={r}>{r}</option>
                                )
                            })}
                        </select>
                    </div>
                    {/* Phone Number Input */}
                    <div>
                        <label className="block mb-1">
                            <span className="font-extrabold text-lg text-black bg-white px-2 border-2 border-black">PHONE NUMBER</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="e.g. +1234567890"
                            className="bg-white w-full px-4 py-3 border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition duration-100 focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none"
                            onChange={(e) => handleForm(e, "phoneNumber")}
                            value={form.phoneNumber}
                        />
                    </div>
                    {/* Address Input */}
                    <div>
                        <label className="block mb-1">
                            <span className="font-extrabold text-lg text-black bg-white px-2 border-2 border-black">ADDRESS</span>
                        </label>
                        <input
                            type="text"
                            placeholder="123 Block St, City"
                            className="bg-white w-full px-4 py-3 border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition duration-100 focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none"
                            onChange={(e) => handleForm(e, "address")}
                            value={form.address}
                        />
                    </div>
                </div>
                {/* Submit Button Area */}
                <div className="mt-8 text-center">
                    <Button nameProp={nameProp} />
                </div>
            </form>
        </>
    )
}