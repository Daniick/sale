import { useEffect, useState } from "react";

export const useProductosData = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/producto")
      .then((res) => res.json())
      .then((data) => setProductos(data)) // Corrected variable name to 'data'
      .catch((error) => console.error(error));
  }, []);

  return productos;
};
