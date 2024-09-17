import React, { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    nombre: "",
    cod: "",
    precio: "",
    marca: "",
    id_categoria: "",
    cantidad: "",
    foto: null,
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      foto: event.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("cod", formData.cod);
    data.append("precio", formData.precio);
    data.append("marca", formData.marca);
    data.append("id_categoria", formData.id_categoria);
    data.append("cantidad", formData.cantidad);
    data.append("foto", formData.foto);

    console.log("Product data submitted:", data);

    fetch("http://127.0.0.1:8000/api/producto", {
      method: "POST",
      body: data,
      headers:{
        "Content-Type" : "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Limpiar el formulario después de enviar los datos
        setFormData({
          nombre: "",
          cod: "",
          precio: "",
          marca: "",
          id_categoria: "",
          cantidad: "",
          foto: null,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Código:</label>
          <input
            type="text"
            name="cod"
            value={formData.cod}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="number"
            name="id_categoria"
            value={formData.id_categoria}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Foto:</label>
          <input type="file" name="foto" onChange={handleFileChange} />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default AddProduct;
