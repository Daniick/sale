import React from "react";
import { RiArrowDownSLine, RiLogoutCircleRLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useMyContext } from "../pages/services/Context";

const Header = () => {
  const { user, logoutUser } = useMyContext();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className="flex justify-between h-[7vh] md:h-[10vh] border-b p-8 items-center bg-zinc-900">
      <div className="flex items-center justify-between gap-8 text-white "></div>

      <nav className="flex items-center gap-2 ">
        <Menu
          menuButton={
            <MenuButton className="flex items-center px-6 py-3 transition-colors rounded-lg gap-x-2 bg-stone-600">
              <img
                src="https://img.freepik.com/vector-gratis/grupo-personas-sonrientes-felices-mirando-vista-superior-ilustracion-vector-plano-fondo-blanco_1284-78599.jpg"
                className="object-cover w-6 h-6 rounded-full"
              />
              <span className="text-white">Perfil</span>
              <RiArrowDownSLine />
            </MenuButton>
          }
          align="end"
          arrow
          arrowClassName="bg-secondary-100"
          transition
          menuClassName="bg-stone-600 p-4"
        >
          {/* Información del Estudiante */}
          <MenuItem className="p-0 hover:bg-transparent">
            <div className="flex items-center flex-1 px-6 py-2 text-black transition-colors rounded-lg gap-x-4">
              <img
                src="https://img.freepik.com/vector-gratis/grupo-personas-sonrientes-felices-mirando-vista-superior-ilustracion-vector-plano-fondo-blanco_1284-78599.jpg"
                className="object-cover w-8 h-8 rounded-full"
              />
              <div className="flex flex-col text-sm cursor-default">
                <span className="text-sm text-white">ID: {user?.user.id}</span>
                <span className="text-sm text-white">
                  Nombre: {user?.user.name}
                </span>
                <span className="text-sm text-white">
                  Email: {user?.user.email}
                </span>
                <span className="text-sm text-white">
                  Telefono: {user?.user.telefono}
                </span>
                <span className="text-sm text-white">
                  Curso: {user?.user.curso}
                </span>
                <span className="text-sm text-white">
                  Rol:{" "}
                  {user?.user.id_rol === 1 ? (
                    <span className="text-yellow-300">Admin</span>
                  ) : user?.user.id_rol === 2 ? (
                    <span>Estudiante</span>
                  ) : (
                    <span className="text-gray-500">Desconocido</span>
                  )}
                </span>
              </div>
            </div>
          </MenuItem>
          <hr className="my-4 border-gray-500" />

          {/* Botón de Cerrar Sesión */}
          <MenuItem className="p-0 hover:bg-transparent">
            <div
              onClick={handleLogout}
              className="flex items-center flex-1 px-6 py-2 text-white transition-colors rounded-lg hover:bg-black gap-x-4 cursor-pointer"
            >
              <RiLogoutCircleRLine className="text-yellow-300" /> Cerrar sesión
            </div>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
