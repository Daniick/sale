import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddCategories() {
  const [palabra, setPalabra] = useState("");
  const [espanol, setEspanol] = useState("");
  const [ingles, setIngles] = useState("");

  const handleUrlChange = (event) => {
    setPalabra(event.target.value);
  };

  const handleNombreChange = (event) => {
    setEspanol(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setIngles(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      palabra,
      espanol,
      ingles,
    };

    console.log("Page data submitted:", data);

    fetch("http://127.0.0.1:8000/api/paginas", {
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
        setPalabra("");
        setEspanol("");
        setIngles("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="w-[100%] h-[60%] mx-auto p-6 bg-white rounded shadow ">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Añadir Página</h2>
          <Link to="/paginas">
            <Button color="primary" className="w-[80px]">
              Back
            </Button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-12">
          <div className="">
            <label
              htmlFor="palabra"
              className="block text-sm font-medium text-gray-700"
            >
              palabra*
            </label>
            <input
              type="text"
              id="palabra"
              name="palabra"
              className="mt-1 p-2 border rounded w-full"
              value={palabra}
              onChange={handleUrlChange}
            />
            <label
              htmlFor="espanol"
              className="block text-sm font-medium text-gray-700"
            >
              Español
            </label>
            <input
              type="text"
              id="espanol"
              name="espanol"
              className="mt-1 p-2 border rounded w-full"
              value={espanol}
              onChange={handleNombreChange}
            />
            <label
              htmlFor="ingles"
              className="block text-sm font-medium text-gray-700"
            >
              Ingles *
            </label>
            <input
              type="text"
              id="ingles"
              name="ingles"
              className="mt-1 p-2 border rounded w-full"
              value={ingles}
              onChange={handleDescripcionChange}
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

export default AddCategories;
