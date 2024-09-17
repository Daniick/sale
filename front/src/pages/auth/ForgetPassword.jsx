import React from "react";
import { Link } from "react-router-dom";
// Icons
import { RiMailLine } from "react-icons/ri";
const ForgetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Recuperar <span className="text-primary">contraseña</span>
        </h1>
        <form className="mb-8">
          <div className="relative mb-8">
            <RiMailLine className="absolute -translate-y-1/2 top-1/2 left-2 text-primary" />
            <input
              type="email"
              className="w-full py-3 pl-8 pr-4 rounded-lg outline-none bg-secondary-900"
              placeholder="Correo electrónico"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-bold text-black uppercase rounded-lg bg-primary"
            >
              Enviar instrucciones
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center gap-4">
          <span className="flex items-center gap-2">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="transition-colors text-primary hover:text-gray-100"
            >
              Ingresa
            </Link>
          </span>
          <span className="flex items-center gap-2">
            ¿No tienes cuenta?{" "}
            <Link
              to="/registro"
              className="transition-colors text-primary hover:text-gray-100"
            >
              Registrate
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;