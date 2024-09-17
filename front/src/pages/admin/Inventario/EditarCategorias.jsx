/* import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function EditarCategorias() {
  const [categoryName, setCategoryName] = useState("");
  const [codeCategoria, setCodeCategoria] = useState("");
                     // Variable de estado para el ID de la categoría

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const inputChange = (event) => {
    setCodeCategoria(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      id: formData.get("id"),
      nombre: formData.get("nombre"),
      codigo: formData.get("codigo")
    };

    console.log("Product data submitted:");

    fetch(`http://127.0.0.1:8000/api/categoria/${idCategoria}`, { 
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setCategoryName("");
        setCodeCategoria("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="w-[100%] h-[60%] mx-auto p-6 bg-white rounded shadow ">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Añadir Categoria</h2>
          <Button color="primary" className="w-[80px]">
            <Link to="/categorias">Back</Link>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-12">
          <div className="">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              ID categoria *
            </label>
            <input
              type="text"
              id="id"
              name="id"
              className="mt-1 p-2 border rounded w-full"
              value={idCategoria} 
              onChange={(e) => setIdCategoria(e.target.value)}
            />
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de la Categoria *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-1 p-2 border rounded w-full"
              value={categoryName}
              onChange={handleInputChange}
            />
            <label
              htmlFor="codigo"
              className="block text-sm font-medium text-gray-700"
            >
              Codigo de la Categoria*
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              className="mt-1 p-2 border rounded w-full"
              value={codeCategoria}
              onChange={inputChange}
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

export default EditarCategorias;
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditarCategorias = () => {
   
}

export default EditarCategorias;


