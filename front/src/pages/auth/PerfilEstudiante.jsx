import React from "react";
import { useMyContext } from "../services/Context";

const Perfil = () => {
  const { user } = useMyContext();
  console.log(user);
  return (
    <div className="max-w-md mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src="https://img.freepik.com/vector-gratis/ilustracion-empresario_53876-5856.jpg"
            alt="User Avatar"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Información de Perfil
          </div>
          <div className="mt-2">
            <div className="text-lg text-gray-700 font-semibold">
              ID: {user.user.id}
            </div>
            <div className="mt-1 text-md text-gray-600">
              Nombre de Usuario: {user.user.name}
            </div>
            <div className="mt-1 text-md text-gray-600">
              {/* Apellido de Usuario: {user.user.apellido} */}
            </div>
            <div className="mt-1 text-md text-gray-600">
              Email de Usuario: {user.user.email}
            </div>
            <div className="mt-1 text-md text-gray-600">
              Creación: {user.user.fecha_creacion}
            </div>
            <div className="mt-1 text-md text-gray-600">
              {/* Estado: {user.user.id_estado} */}
            </div>
            <div className="mt-1 text-md text-gray-600">
              Rol: {user.user.id_rol}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
