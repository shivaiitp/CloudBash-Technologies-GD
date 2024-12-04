import React, { useEffect, useState } from "react";

const SimilarProducts = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/recommendations/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch recommendations");

        const data = await response.json();
        setProducts(data.products || []); // Adjust based on the API response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-2 border rounded">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded" />
            <h3 className="text-sm font-medium mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600">Rs. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
