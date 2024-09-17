import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditarProducto = () => {
  const { id } = useParams();

  const [usuario, setUsuario] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    apellido: "",
    email: "",
    password: "",
    id_rol: "",
    fecha_nacimiento: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8000/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          name: "",
          apellido: "",
          email: "",
          password: "",
          id_rol: "",
          fecha_nacimiento: "",
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/roles`)
      .then((res) => res.json())
      .then((data) => setUsuario(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="w-[100%] h-[60%] mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Actualizar Producto</h2>
          <Link to="/usuarios">
            <Button color="primary" className="w-[80px]">
              Back
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-12">
          <div className="">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Ingrese Nuevo Nombre"
              onChange={handleInputChange}
            />
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Ingrese Nuevo Apellido"
              onChange={handleInputChange}
            />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Ingrese Nuevo Email"
              onChange={handleInputChange}
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="**************"
              onChange={handleInputChange}
            />
            <label
              htmlFor="id_rol"
              className="block text-sm font-medium text-gray-700"
            >
              Rol
            </label>
            <select
              name="id_rol"
              id="id_rol"
              className="mt-1 p-2 border rounded w-full"
              onChange={handleInputChange}
              value={formData.id_rol}
            >
              <option value="" disabled>
                Selecciona un Rol
              </option>
              {usuario.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>

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

export default EditarProducto;
