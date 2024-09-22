import React, { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import CardsEstudiante from "../../components/CardsEstudiante";
import { useMyContext } from "../services/Context";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";

const Estudiantes = () => {
  const { user } = useMyContext();
  const [almuerzos, setAlmuerzos] = useState([]);
  const [showProfile, setShowProfile] = useState(false); // Estado para controlar el hover

  useEffect(() => {
    // Función para obtener los almuerzos desde la API
    const fetchAlmuerzos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/almuerzos");
        const data = await response.json();
        setAlmuerzos(data);
      } catch (error) {
        console.error("Error al obtener los almuerzos:", error);
      }
    };

    fetchAlmuerzos();
  }, []);

  // Función para filtrar almuerzos por día
  const filtrarPorDia = (dia) => {
    return almuerzos.filter((almuerzo) => almuerzo.dia_semana === dia);
  };

  // Función para realizar la reserva
  const reservarAlmuerzo = async (almuerzoId) => {
    if (!user) return;

    console.log("Datos de la reserva:", {
      user_id: user.user.id,
      almuerzo_id: almuerzoId,
    }); // Log para depuración

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user.id,
          almuerzo_id: almuerzoId,
        }),
      });

      const data = await response.json();

      console.log("Respuesta de la API:", data); // Log para ver la respuesta de la API

      if (response.ok) {
        alert(
          `Reserva creada con éxito. Stock restante: ${data.stock_restante}`
        );
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al reservar el almuerzo:", error);
      alert("Hubo un error al intentar reservar el almuerzo.");
    }
  };

  return (
    <section className="bg-orange-500">
      {!user && <Navigate to="/main" />}
      <Header
        onProfileHover={() => setShowProfile(true)}
        onProfileLeave={() => setShowProfile(false)}
      />
      <div className="p-12">
        {showProfile && user && (
          <div className="absolute bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl">Perfil de {user.user.name}</h2>
            <p>Email: {user.user.email}</p>
            <p>ID: {user.user.id}</p>
            {/* Más información del estudiante */}
          </div>
        )}

        {/* Resto del contenido */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl text-black">
            Bienvenido Estudiante {user && user.user.name}!
          </h1>
          <div className="flex items-center gap-2 text-3xl">
            <RiArrowLeftSLine className="transition-colors hover:cursor-pointer hover:text-white" />
            <RiArrowRightSLine className="transition-colors hover:cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Renderizar CardsEstudiante para cada día de la semana */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {["lunes", "martes", "miércoles", "jueves", "viernes"].map(
            (dia, index) => {
              const almuerzoDelDia = filtrarPorDia(dia);
              const descripcion =
                almuerzoDelDia.length > 0
                  ? almuerzoDelDia[0].menu_descripcion
                  : "No hay menú";
              const almuerzoId =
                almuerzoDelDia.length > 0 ? almuerzoDelDia[0].id : null;

              return (
                <CardsEstudiante
                  key={index}
                  ticket="total"
                  totalTickets={dia.charAt(0).toUpperCase() + dia.slice(1)} // Capitaliza el nombre del día
                  text={descripcion}
                  almuerzoId={almuerzoId}
                  userId={user ? user.user.id : null}
                  enlace="/compras"
                  onReservar={() => almuerzoId && reservarAlmuerzo(almuerzoId)}
                />
              );
            }
          )}
        </div>

        <div className="my-10 p-8 bg-black rounded-xl text-white flex flex-col text-center px-4">
          <h1 className="text-3xl mb-5 text-red-500">Almuerzos</h1>
          <div className="text-xl flex flex-col items-center gap-5 mx-4">
            <img
              src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?cs=srgb&dl=pexels-pixabay-267885.jpg&fm=jpg"
              alt=""
              className="w-[600px] h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Estudiantes;
