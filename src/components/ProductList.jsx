import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchId) {
      try {
        // Realiza la solicitud a la API con el ID proporcionado
        const response = await axios.get(`https://fakestoreapi.com/products/${searchId}`);
        setSearchedProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        // Limpia los detalles del producto en caso de error
        setSearchedProduct(null);
      }
    } else {
      // Si el campo de búsqueda está vacío, muestra todos los productos
      setSearchedProduct(null);
    }
  };

  return (
    <div>
      {/* Formulario de búsqueda por ID */}
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID del Producto"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Buscar
            </button>
          </div>
        </div>
      </form>

      {searchedProduct ? (
        // Mostrar detalles del producto encontrado
        <div>
          <h1>Detalles del Producto</h1>
          <p>ID: {searchedProduct.id}</p>
          <p>Nombre: {searchedProduct.title}</p>
          <p>Precio: {searchedProduct.price}</p>
          <p>Categoría: {searchedProduct.category}</p>
          <img src={searchedProduct.image} alt={searchedProduct.title} className="img-fluid img-thumbnail w-50" />
        </div>
      ) : (
        // Mostrar la lista de productos si no se ha realizado una búsqueda o si el campo de búsqueda está vacío
        <div>
          <h1>Lista de Productos</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <img src={product.image} alt={product.title} className="img-fluid img-thumbnail w-50" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;
