import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddBill() {
  const [formData, setFormData] = useState({
    num_factura: "",
    proveedore_id: "",
    productos: [],
  });
  const [productoxxx, setProductoxxx] = useState([]);
  const [proveedorxxx, setProveedorxxx] = useState([]);
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/producto")
      .then((res) => res.json())
      .then((dataProducto) => {
          setProductoxxx(dataProducto);
      })
      .catch((error) => console.error(error));
}, []);

useEffect(() => {
    fetch("http://127.0.0.1:8000/api/proveedore")
      .then((res) => res.json())
      .then((dataProveedor) => {
        setProveedorxxx(dataProveedor);
        
      })
      .catch((error) => console.error(error));
}, []);
  

  const handleProductoChange = (event, index) => {
    const productos = [...formData.productos];
    productos[index][event.target.name] = event.target.value;
    setFormData({ ...formData, productos });
  };

  const handleAddProducto = () => {
    setFormData({
      ...formData,
      productos: [
        ...formData.productos,
        { producto_id: "", cantidad: "", precio_unitario: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    fetch("http://127.0.0.1:8000/api/compra", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          num_factura: "",
          proveedore_id: "",
          productos: [],
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-8">Agregar Compra</h2>
        <Button color="primary" className="w-[80px]">
            <Link to="/compras">Back</Link>
          </Button>
      </div>
      

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Número de Factura:</label>
          
          <input
            type="text"
            name="num_factura"
            value={formData.num_factura}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2"> Proveedor </label>
          <select name="proveedore_id"
            value={formData.proveedore_id}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500">
<option value="" disabled>
Selecciona un Proveedor
              </option>
              {proveedorxxx.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
          </select>
         
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Productos</h3>
          {formData.productos.map((producto, index) => (
            <div key={index} className="space-y-2">
              <label className="block">Producto</label>
              <select  name="producto_id" value={producto.producto_id} onChange={(event) => handleProductoChange(event, index)}
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" >
                <option value="" disabled>
                Selecciona
              </option>
              {productoxxx.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
              </select>
              
            
              <label className="block">Cantidad:</label>
              <input
                type="number"
                name="cantidad"
                value={producto.cantidad}
                onChange={(event) => handleProductoChange(event, index)}
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              <label className="block">Precio Unitario:</label>
              <input
                type="number"
                name="precio_unitario"
                value={producto.precio_unitario}
                onChange={(event) => handleProductoChange(event, index)}
                className="w-full border  border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              <div className="pt-5 pb-10"><hr className=" border-blue-500 "/></div>
              
            </div>
          ))}
          
        </div>
        <button
          type="button"
          onClick={handleAddProducto}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-3"
        >
          Agregar Producto
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Agregar Compra
        </button>
      </form>
    </div>
  );
}

export default AddBill;
