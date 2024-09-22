import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../services/useFetch";
// Icons
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiUserLine,
} from "react-icons/ri";

const Register = () => {
  /* s */
  const handleSubmitPost = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Verifica qué datos están siendo recogidos del formulario
    console.log("Datos del formulario:", Object.fromEntries(formData));

    try {
      const response = await fetch(event.target.action, {
        method: "POST",
        body: formData,
      });

      const jsonData = await response.json();
      console.log("Respuesta del servidor:", jsonData);

      if (!response.ok) {
        console.error("Error en el registro:", jsonData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-orange-300">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Crear cuenta</h2>
        <form
          onSubmit={handleSubmitPost}
          action="http://127.0.0.1:8000/api/auth/register"
          className="mb-10"
        >
          <div className="relative mb-4">
            <RiUserLine className="absolute -translate-y-1/2 top-1/2 left-2 text-[#4791ff]" />
            <input
              type="text"
              className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nombre"
              name="name"
            />
          </div>

          <div className="relative mb-4">
            <RiMailLine className="absolute -translate-y-1/2 top-1/2 left-2 text-[#4791ff]" />
            <input
              type="email"
              className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Correo electrónico"
              name="email"
            />
          </div>

          <div className="relative mb-4">
            <RiLockLine className="absolute -translate-y-1/2 top-1/2 left-2 text-[#4791ff]" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Contraseña"
              name="password"
            />
            {showPassword ? (
              <RiEyeOffLine
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -translate-y-1/2 top-1/2 right-2 hover:cursor-pointer text-[#4791ff]"
              />
            ) : (
              <RiEyeLine
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -translate-y-1/2 top-1/2 right-2 hover:cursor-pointer text-[#4791ff]"
              />
            )}
          </div>

          <div className="relative mb-4">
            <RiMailLine className="absolute -translate-y-1/2 top-1/2 left-2 text-[#4791ff]" />
            <input
              type="text"
              className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Teléfono"
              name="telefono"
            />
          </div>

          <div className="relative mb-6">
            <RiMailLine className="absolute -translate-y-1/2 top-1/2 left-2 text-[#4791ff]" />
            {/* <input
              type="text"
              className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Curso"
              name="curso"
            /> */}
            <select
              className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              name="curso"
              defaultValue="hola"
              required
            >
              <option value="" disabled>
                Seleccionar Curso
              </option>
              <option value="6A">6A</option>
              <option value="6B">6B</option>
              <option value="6C">6C</option>
              <option value="7A">7A</option>
              <option value="7B">7B</option>
              <option value="7C">7C</option>
              <option value="8A">8A</option>
              <option value="8B">8B</option>
              <option value="8C">8C</option>
              <option value="9A">9A</option>
              <option value="9B">9B</option>
              <option value="9C">9C</option>
              <option value="10A">10A</option>
              <option value="10B">10B</option>
              <option value="10C">10C</option>
              <option value="11A">11A</option>
              <option value="11B">11B</option>
              <option value="11C">11C</option>
            </select>
          </div>
          <div className="relative mb-6">
            <RiMailLine className="absolute -translate-y-1/2 top-1/2 left-2 text-[#4791ff]" />
            <select
              className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              name="id_rol"
              defaultValue="2"
              disabled
            >
              <option value="2">Estudiantes</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrarme
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
