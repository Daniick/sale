function useFetch() {
  const handleSubmitPost = async (e) => {
    e.preventDefault();

    const formulario = e.target;
    const url = formulario.getAttribute("action");

    // Crear un objeto con los datos del formulario
    const formData = {};
    for (const input of formulario) {
      if (input.tagName.toLowerCase() === "input" && input.name) {
        formData[input.name] = input.value;
      }
    }

    // Mostrar los datos en la consola para depuración
    console.log("Datos del formulario:", formData);

    // Enviar los datos al servidor
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Obtener y procesar la respuesta
    const dataJson = await res.json();

    console.log("Respuesta del servidor:", res);
    console.log("Datos JSON:", dataJson);

    if (res.ok) {
      return dataJson; // Retorna los datos si la respuesta es exitosa
    }

    // Manejo de errores
    if (res.status === 400) {
      alert(dataJson?.message ?? "Credenciales inválidas");
    } else if (res.status === 500) {
      alert(dataJson?.message ?? "Error interno.");
    }

    return null;
  };

  return { handleSubmitPost };
}

export default useFetch;
