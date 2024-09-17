import React, { useState, useEffect } from "react";
import useFetch from "../services/useFetch";
import { useMyContext } from "../services/Context";
import { Link, Navigate } from "react-router-dom";
// Icons
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";

const Login = () => {
  const { user, loginUser } = useMyContext();
  const { handleSubmitPost } = useFetch();
  const [showPassword, setShowPassword] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await handleSubmitPost(e);
    loginUser(data);
  };

  useEffect(() => {
    if (user && user.user && user.user.id_rol) {
      // Check user.role or user.id_rol directly
      if (user.user.id_rol === 1) {
        setRedirectTo("/dashboard");
      } else if (user.user.id_rol === 2) {
        setRedirectTo("/student-dashboard"); // Adjust this route as needed
      } else {
        console.log("Unrecognized id_rol:", user.user);
      }
    }
  }, [user]);

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-900 to-orange-300">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">
          Inicio de Sesión
        </h2>
        <form
          onSubmit={handleLogin}
          action="http://127.0.0.1:8000/api/auth/login"
          className="mb-8"
        >
          <div className="relative mb-4">
            <RiMailLine className="absolute -translate-y-1/2 top-1/2 left-2 text-[#4791ff]" />
            <input
              type="email"
              className="w-full py-3 pl-8 pr-4 rounded-md outline-none bg-gray-100 border border-gray-300"
              placeholder="Correo electrónico"
              name="email"
            />
          </div>
          <div className="relative mb-6">
            <RiLockLine className="absolute -translate-y-1/2 top-1/2 left-2 text-[#4791ff]" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-8 py-3 rounded-md outline-none bg-gray-100 border border-gray-300"
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
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-orange-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
