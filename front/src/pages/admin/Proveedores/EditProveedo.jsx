import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditProveedo = () => {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState({
    nombre: "",
    id_estado: "",
  });
  const [estados, setEstados] = useState([]);
  const [roles, setRoles] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProveedor({ ...proveedor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8000/api/roles/${id}`, {
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
        setProveedor({ nombre: "", id_estado: "" });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/estados`)
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .catch((error) => console.error(error));
  }, []);

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/api/roles`)
  //     .then((res) => res.json())
  //     .then((data) => setRoles(data))
  //     .catch((error) => console.error(error));
  // }, []);
  console.log(roles);

  return (
    <div>
      <div className="w-[100%] h-[60%] mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Actualizar Proveedor</h2>
          <Button color="primary" className="w-[80px]">
            <Link to="/roles">Back</Link>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-12">
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
              className="mt-1 p-2 border rounded w-full"
              placeholder="Nombre Proveedor"
              value={proveedor.nombre}
              onChange={handleInputChange}
            />
            <label
              htmlFor="id_estado"
              className="block text-sm font-medium text-gray-700"
            >
              Estado
            </label>
            <select
              name="id_estado"
              id="id_estado"
              className="mt-1 p-2 border rounded w-full"
              value={proveedor.id_estado}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Selecciona un Estado
              </option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.nombre}
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

export default EditProveedo;
