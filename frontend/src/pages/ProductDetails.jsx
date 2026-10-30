// 


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        axios
            .get(`http://localhost:8000/api/v1/product/${id}`)
            .then((response) => {
                console.log("API Response:", response.data);
                console.log("Product:", response.data.product);
                setProduct(response.data.product);
            })
            .catch((error) => {
                console.log(error);
                setError("Unable to load product details.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg font-medium text-gray-500">
                    Loading product...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="rounded-lg bg-red-50 px-5 py-3 text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg text-gray-500">
                    Product not found.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8 lg:px-12">

            <div className="mx-auto max-w-6xl">

                <div className="overflow-hidden rounded-2xl bg-white shadow-md">

                    <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-10">

                        {/* Product Image */}
                        <div className="flex items-center justify-center rounded-xl bg-gray-100 p-6">
                            <img
                                src={product.image}
                                alt={product.productName}
                                className="h-72 w-full object-contain sm:h-96"
                            />
                        </div>

                        {/* Product Information */}
                        <div className="flex flex-col justify-center gap-5">

                            <div>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                                    {product.category}
                                </p>

                                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    {product.productName}
                                </h1>
                            </div>

                            <p className="text-3xl font-bold text-green-600">
                                ₹{product.price}
                            </p>

                            <div className="border-t border-gray-200 pt-5">
                                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                    Product Description
                                </h2>

                                <p className="leading-7 text-gray-600">
                                    {product.description}
                                </p>
                            </div>

                            <div>
                                <span className="text-sm font-medium text-gray-700">
                                    Available Stock:
                                </span>

                                <span className={`ml-2 text-sm font-semibold ${product.stock > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}>
                                    {product.stock > 0
                                        ? `${product.stock} items available`
                                        : "Out of Stock"}
                                </span>
                            </div>

                            <button
                                disabled={product.stock <= 0}
                                className="mt-3 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-fit sm:min-w-48"
                            >
                                Add to Cart
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
