import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [inventario, setInventario] = useState([]);
  const [estado, setEstado] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/roles")
      .then((res) => res.json())
      .then((data) => setInventario(data))
      .catch((error) => console.error(error));
  }, []);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/estados")
  //     .then((res) => res.json())
  //     .then((data) => setEstado(data))
  //     .catch((error) => console.error(error));
  // }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "apellido":
        setApellido(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "id_rol":
        setIdCategoria(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      apellido,
      email,
      password,
      id_rol: idCategoria,
      // id_estado: estado,
    };

    fetch("http://127.0.0.1:8000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setName("");
        setApellido("");
        setEmail("");
        setPassword("");
        setIdCategoria("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="w-full h-full mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Añadir Usuario</h2>
          <Link to="/usuarios">
            <Button color="primary" className="w-[80px]">
              Back
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-12">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del Usuario
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              className="mt-1 p-2 border rounded w-full"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido del Usuario
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={apellido}
              className="mt-1 p-2 border rounded w-full"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email del Usuario
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              className="mt-1 p-2 border rounded w-full"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="mt-1 p-2 border rounded w-full"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="id_rol"
              className="block text-sm font-medium text-gray-700"
            >
              Rol
            </label>
            <select
              id="id_rol"
              name="id_rol"
              value={idCategoria}
              className="mt-1 p-2 border rounded w-full"
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Selecciona un Rol
              </option>
              {inventario.map((item) => (
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
            Agregar
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
