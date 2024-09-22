import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../pages/services/Context";
// Icons
import {
  RiBarChart2Line,
  RiEarthLine,
  RiCustomerService2Line,
  RiCalendarTodoLine,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
  RiPagesLine,
} from "react-icons/ri";
import { FaCashRegister, FaRegUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {
  const { logoutUser } = useMyContext();
  const handleLogout = () => {
    logoutUser();
  };
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-black border-r-red-500 p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          <h1 className="mb-20 text-2xl font-bold text-center text-white">
            Admin<span className="text-4xl text-yellow-300">.</span>
          </h1>
          <ul className="">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center mb-5 gap-4 px-4 py-4 text-white transition-colors rounded-lg hover:bg-zinc-800 "
              >
                <LuLayoutDashboard className="text-yellow-300 " />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/usuarios"
                className="flex items-center mb-5 gap-4 px-4 py-4 text-white transition-colors rounded-lg hover:bg-zinc-800"
              >
                <FaRegUser className="text-yellow-300" /> Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/compras"
                className="flex items-center mb-5 gap-4 px-4 py-4 text-white transition-colors rounded-lg hover:bg-zinc-800"
              >
                <FaCashRegister className="text-yellow-300" /> Almuerzos
              </Link>
            </li>
            <li>
              <Link
                to="/paginas"
                className="flex items-center mb-5 gap-4 px-4 py-4 text-white transition-colors rounded-lg hover:bg-zinc-800"
              >
                <RiPagesLine className="text-yellow-300" /> Reservas
              </Link>
            </li>
            {/* <li>
              <Link
                to="/roles"
                className="flex items-center mb-5 gap-4 px-4 py-4 text-white transition-colors rounded-lg hover:bg-zinc-800"
              >
                <GrUserAdmin className="text-yellow-300" /> Roles
              </Link>
            </li>
            {/* <li>
              <button
                onClick={() => setShowSubmenu(!showSubmenu)}
                className="flex items-center justify-between w-full px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <span className="flex items-center gap-4">
                  <RiEarthLine className="text-[#4791ff] " /> Inventario
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${
                    showSubmenu && "rotate-90"
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu ? "h-[130px]" : "h-0"
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="/categorias"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-[#4791ff] before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-white-100 text-white transition-colors hover:text-gray-500"
                  >
                    Categorias
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inventario"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-[#4791ff] before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-white-100 text-white transition-colors hover:text-gray-500"
                  >
                    Inventario
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Proveedores"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-[#4791ff] before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-white-100 text-white transition-colors hover:text-gray-500"
                  >
                    Proveedores
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link
                to="/"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiCalendarTodoLine className="text-[#4791ff]" /> Calendario
              </Link>
            </li> */}
          </ul>
        </div>
        <nav>
          <Link
            to="/"
            className="flex items-center gap-4 px-4 py-4 text-white transition-colors rounded-lg hover:bg-zinc-800 cursor-pointer"
          >
            <RiLogoutCircleRLine className="text-yellow-300" />{" "}
            <button onClick={handleLogout}>Cerrar sesión</button>
          </Link>
        </nav>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed z-50 p-3 text-black rounded-full xl:hidden bottom-4 right-4 bg-[#4791ff]"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar;
