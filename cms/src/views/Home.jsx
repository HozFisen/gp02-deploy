import { useEffect, useState } from "react"
import Toastify from 'toastify-js'
import axios from 'axios'
import baseUrl from "../constant/url"
import Card from "../components/Card"
import loadingGif from '../assets/loading.svg'

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const pages = generatePages()

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${baseUrl}/apis/pub/products/products?limit=12&q=${search}&page=${currentPage}`)

            setProducts(data.data)
            setCurrentPage(data.meta.page)
            setTotalPage(data.meta.totalPages)
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
        } finally {
            setLoading(false)
        }
    }

    function handleSearch(e) {
        e.preventDefault()
        fetchProducts()
    }

    function generatePages() {
        const array = []
        for (let i = 1; i <= totalPage; i++) {
            array.push(i)
        }

        return array
    }

    function handlePages(page) {
        setCurrentPage(page)
    }

    function handlePrevious() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function handleNext() {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }


    useEffect(() => {
        fetchProducts()
    }, [currentPage])

    return (
        <>
            <div className="mt-8">
                {/* Search */}
                <form className="max-w-md mx-auto border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" onSubmit={handleSearch}>
                    <div className="relative flex items-center w-full h-12 rounded-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="{2}"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-800 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search something.."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>

                {loading ? (
                    <>
                        {/* Loading */}
                        <div className="flex justify-center w-screen h-screen">
                            <img src={loadingGif} className="w-1/4" />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Main Product */}
                        <div id="PAGE-HOME" className="min-h-screen flex items-center justify-center">
                            <main className="my-8 bg-white grid grid-cols-4 gap-5">
                                {products.map((product) => {
                                    return <Card product={product} key={product.id} fetchProducts={fetchProducts} />
                                })}
                            </main>
                        </div>
                    </>
                )}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-x-1">
                <button
                    type="button"
                    className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
                    onClick={handlePrevious}
                    disabled={currentPage <= 1 ? true : false}
                >
                    <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="{2}"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span>Prev</span>
                </button>

                <div className="flex items-center gap-x-1">
                    {pages.map((page) => {
                        return (
                            <div key={page}>
                                <button
                                    type="button"
                                    className={page === currentPage ? "min-h-[38px] min-w-[38px] flex justify-center items-center bg-purple-400 py-2 px-3 text-sm border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm"}
                                    onClick={() => handlePages(page)}
                                >
                                    {page}
                                </button>
                            </div>
                        )
                    })}
                </div>

                <button
                    type="button"
                    className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
                    onClick={handleNext}
                    disabled={currentPage >= totalPage ? true : false}
                >
                    <span>Next</span>
                    <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="{2}"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </nav>

        </>
    )
}