import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditProveedo = () => {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState({
    dia_semana: "",
    menu_descripcion: "",
    stock: "",
    id_estado: "",
  });
  const [estados, setEstados] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProveedor({ ...proveedor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8000/api/almuerzos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(proveedor),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProveedor({
          dia_semana: "",
          menu_descripcion: "",
          stock: "",
          id_estado: "",
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="w-[100%] h-[60%] mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Actualizar Almuerzo</h2>
          <Button color="primary" className="w-[80px]">
            <Link to="/compras">Back</Link>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-12">
          {/* Campo para día de la semana */}
          <div>
            <label
              htmlFor="dia_semana"
              className="block text-sm font-medium text-gray-700"
            >
              Día de la Semana
            </label>
            <select
              id="dia_semana"
              name="dia_semana"
              className="mt-1 p-2 border rounded w-full"
              value={proveedor.dia_semana}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Selecciona un día
              </option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="menu_descripcion"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción del Menú
            </label>
            <input
              type="text"
              id="menu_descripcion"
              name="menu_descripcion"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Descripción del menú"
              value={proveedor.menu_descripcion}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo para stock */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Stock"
              value={proveedor.stock}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo para estado */}

          <button
            type="submit"
            className="col-span-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-[100px] mx-auto"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProveedo;
