import { useEffect, useState } from "react"
import axios from 'axios'
import Toastify from 'toastify-js'
import baseUrl from "../constant/url"

export default function CategoryList() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    // Function to fetch category data
    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/products/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setCategories(data.data)
        } catch (error) {
            console.error("Error fetching categories:", error);
            Toastify({
                text: "Failed to load categories.",
                duration: 3000,
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        fetchCategories()
    }, [])

    // Utility function for Neo-Brutalist date formatting
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) {
        // Neo-Brutalist loading state: Blocky text/simple spinner
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 font-mono">
                <div className="text-4xl font-extrabold text-black p-6 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    LOADING CATEGORY DATA...
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Using the previously styled Navbar */}
            
            <div className="p-8 font-mono">
                {/* Header for the page */}
                <h2 className="text-4xl font-extrabold mb-8 uppercase text-center py-3 bg-red-400 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] max-w-4xl mx-auto">
                    Category Management
                </h2>

                {/* Table Container: White background, thick border, strong shadow */}
                <div className="max-w-4xl mx-auto overflow-x-auto bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                    <table className="min-w-full divide-y divide-black border-collapse">
                        
                        {/* Table Header */}
                        <thead className="bg-gray-800 text-yellow-400 border-b-4 border-black">
                            <tr>
                                {/* Header Cells: Bold, high contrast */}
                                <th scope="col" className="px-6 py-4 text-left text-xl font-extrabold uppercase tracking-wider border-r-4 border-black">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xl font-extrabold uppercase tracking-wider border-r-4 border-black">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xl font-extrabold uppercase tracking-wider border-r-4 border-black">
                                    Created At
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="bg-white divide-y-4 divide-black">
                            {categories.map((category, index) => (
                                <tr key={category.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} transition duration-150 hover:bg-yellow-100`}>
                                    
                                    {/* Data Cells: Blocky text, strong borders */}
                                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 border-r-4 border-black">
                                        {category.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 border-r-4 border-black">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800 border-r-4 border-black">
                                        {formatDate(category.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}