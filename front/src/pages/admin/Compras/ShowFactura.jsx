import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ShowFactura = () => {
  const { id } = useParams();
  const [compra, setCompra] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/compra/${id}`)
      .then((res) => res.json())
      .then((data) => setCompra(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {compra ? (
        <div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-4 text-blue-600">
              Detalles de la compra con ID: {id}
            </h1>
            <Button color="primary" className="w-[80px]">
              <Link to="/compras">Back</Link>
            </Button>
          </div>
          <p className="mb-2">Número de factura: {compra.num_factura}</p>
          <p className="mb-2">Fecha de creación: {compra.created_at}</p>
          <p className="mb-2">Proveedor: {compra.proveedore.compañia}</p>
          <h2 className="text-2xl font-bold mt-6 mb-2 text-blue-600">
            Productos:
          </h2>
          <table className="w-full border-collapse border border-gray-200 mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Nombre</th>
                <th className="border border-gray-200 px-4 py-2">Cantidad</th>
                <th className="border border-gray-200 px-4 py-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              {compra.productos.map((producto, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">
                    {producto.nombre}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {producto.cantidad}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {producto.costo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xl">Cargando detalles de la compra...</p>
      )}
    </div>
  );
};

export default ShowFactura;
