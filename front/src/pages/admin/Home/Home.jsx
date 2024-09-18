import React from "react";
import { Link } from "react-router-dom";
import CardTicket from "../../../components/CardTicket";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useMyContext } from "../../services/Context";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const Home = () => {
  const { user } = useMyContext();
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl text-black">
          Bienvenido Admin {user && user.user.name}!
        </h1>
        <div className="flex items-center gap-2 text-3xl">
          <RiArrowLeftSLine className="transition-colors hover:cursor-pointer hover:text-white" />
          <RiArrowRightSLine className="transition-colors hover:cursor-pointer hover:text-white" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
        <CardTicket
          ticket="total"
          totalTickets="Lunes"
          text="Ver Almuerzos"
          enlace="/compras"
        />
        <CardTicket
          ticket="pending"
          totalTickets="Martes"
          text="Ver Almuerzos"
          enlace="/compras"
        />
        <CardTicket
          ticket="inProcess"
          totalTickets="Miercoles"
          text="Ver Almuerzos"
          enlace="/compras"
        />
        <CardTicket
          ticket="close"
          totalTickets="Jueves"
          text="Ver Almuerzos"
          enlace="/compras"
        />
        <CardTicket
          ticket="close"
          totalTickets="Viernes"
          text="Ver Almuerzos"
          enlace="/compras"
        />
      </div>

      <div className=" my-10 p-8 bg-black rounded-xl text-white flex flex-col text-center px-4">
        <h1 className="text-3xl mb-5 text-red-500">Almuerzos</h1>
        <div className="text-xl flex flex-col items-center gap-5 mx-4">
          <img
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?cs=srgb&dl=pexels-pixabay-267885.jpg&fm=jpg"
            alt=""
            className="w-[600px] h-[500px] "
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
