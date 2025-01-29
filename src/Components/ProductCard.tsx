import React, { useEffect, useState } from 'react'


type Product = {
    id: number,
    name: string,
    price: number,
    category: string,
    image: string
};


const ProductCard = () => {
    const [searchProduct, setSearchProduct] = useState<string>("");
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [productData, setProductData] = useState<Product[]>([]);

    useEffect(() => {
        const fetchproductData = async () => {
            try {
                const response = await fetch("/products.json");
                const data = await response.json();
                setProductData(data.products);
            } catch (err) {
                console.error("Error fetching product data:", err);
            }
        };
        fetchproductData();
    }, []);


    const handleSearch = () => {
        const foundProduct = productData.find((e) =>
            e.name.toLowerCase().includes(searchProduct.toLowerCase())
        );
        if (foundProduct) {
            setProduct(foundProduct);
            setError(null);
        } else {
            setProduct(null);
            setError("No product found with the given name");
        }
    };

    return (
        <div className="product-card">
            <div className="search-section">
                <input
                    type="text"
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    placeholder="Enter product name..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="results-section">
                {error && <p>{error}</p>}
                {product && (
                    <div className="product-info">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <p>Product name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <p>Category: {product.category}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCard