import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddBill() {
  const [formData, setFormData] = useState({
    dia_menu: "",
    menu_descripcion: "",
    stock: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/almuerzos", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally handle the response data
        setFormData({
          dia_menu: "",
          menu_descripcion: "",
          stock: "",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-8">Agregar Almuerzo</h2>
        <Button color="primary" className="w-[80px]">
          <Link to="/compras">Back</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Día del Menú</label>
          <select
            name="dia_semana" // Asegúrate de que el nombre coincida con la clave en formData
            value={formData.dia_semana} // Cambié esto a formData.dia_semana
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
          >
            <option value="">Selecciona un día</option>
            <option value="lunes">Lunes</option>
            <option value="martes">Martes</option>
            <option value="miércoles">Miércoles</option>
            <option value="jueves">Jueves</option>
            <option value="viernes">Viernes</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Descripción del Almuerzo</label>
          <input
            type="text"
            name="menu_descripcion"
            value={formData.menu_descripcion}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block mb-2">Cantidad de Almuerzos</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Agregar Almuerzo
        </button>
      </form>
    </div>
  );
}

export default AddBill;
