import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddProveedor() {
  const [nombre, setNombre] = useState("");

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombre: nombre,
    };

    console.log("Proveedor data submitted:", data);

    fetch("http://127.0.0.1:8000/api/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Borrar los datos del input
        setNombre("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="w-[100%] h-[70%] mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Añadir Rol</h2>
          <Link to="/roles">
            <Button color="primary" className="w-[80px]">
              Back
            </Button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-12">
          <div className="">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre De Rol
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-1 p-2 border rounded w-full"
              value={nombre}
              onChange={handleNombreChange}
            />
          </div>

          <button
            type="submit"
            className="col-span-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-[100px] mx-auto"
          >
            Agregar
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProveedor;
