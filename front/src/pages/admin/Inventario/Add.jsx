import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [curso, setCurso] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/roles")
      .then((res) => res.json())
      .then((data) => setInventario(data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "telefono":
        setTelefono(value);
        break;
      case "curso":
        setCurso(value);
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
      telefono,
      email,
      password,
      curso, // Incluyendo el campo curso
      id_rol: idCategoria,
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
        console.log("API Response:", data); // Mostrar la respuesta de la API
        setName("");
        setTelefono("");
        setCurso(""); // Reiniciar el valor del curso
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
              Nombre Completo del Usuario
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Ingrese el Nombre"
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
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Ingrese el Email"
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
              placeholder="Ingrese la Contraseña"
              className="mt-1 p-2 border rounded w-full"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              placeholder="Ingrese el Teléfono"
              className="mt-1 p-2 border rounded w-full"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="curso"
              className="block text-sm font-medium text-gray-700"
            >
              Curso
            </label>
            <input
              type="text"
              id="curso"
              name="curso"
              value={curso}
              placeholder="Ingrese el Curso"
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
                  {item.name}
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
