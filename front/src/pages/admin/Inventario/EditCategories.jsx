import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditCategories = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({ name: "", codigo: "" });
  /* console.log(category) */

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8000/api/categoria/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setCategory({ name: "", codigo: "" });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categoria/${id}`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <div className="w-[100%] h-[60%] mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Actualizar Categoría</h2>
          <Button color="primary" className="w-[80px]">
            <Link to="/categorias">Atrás</Link>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-1 p-2 border rounded w-[30%]"
              placeholder={category.nombre}
              onChange={handleInputChange}
            />
            <label
              htmlFor="codigo"
              className="block text-sm font-medium text-gray-700"
            >
              Codigo
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              className="mt-1 p-2 border rounded w-[30%]"
              placeholder={category.codigo}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-[100px] mx-auto h-12"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategories;
