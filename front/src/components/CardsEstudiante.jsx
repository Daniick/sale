import React from "react";
import { Button } from "@nextui-org/react";

const CardTicket = (props) => {
  const { ticket, totalTickets, text, almuerzoId, userId } = props;

  let status = "";
  let textColor = "";

  switch (ticket) {
    case "pending":
      status = "bg-yellow-500/10 text-yellow-500";
      textColor = "text-yellow-500";
      break;
    case "inProcess":
      status = "bg-blue-500/10 text-blue-500";
      textColor = "text-blue-500";
      break;
    case "close":
      status = "bg-green-500/10 text-green-500";
      textColor = "text-green-500";
      break;
    case "total":
      status = "bg-pink-500/10 text-pink-500";
      textColor = "text-pink-500";
      break;
  }

  // Función para manejar la reserva
  const handleReservar = async () => {
    try {
      console.log("Datos de la reserva:", {
        user_id: userId,
        almuerzo_id: almuerzoId,
      }); // Log para depuración

      const response = await fetch("http://127.0.0.1:8000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          almuerzo_id: almuerzoId,
        }),
      });

      const data = await response.json();

      console.log("Respuesta de la API:", data); // Log para ver la respuesta de la API

      if (response.ok) {
        alert("Reserva creada con éxito");
      } else {
        alert(data.message || "Error al crear la reserva");
      }
    } catch (error) {
      console.error("Error al hacer la reserva:", error);
      alert("Error al hacer la reserva");
    }
  };

  return (
    <div className="p-8 bg-black text-white rounded-xl">
      <div className="flex items-center justify-between mb-4"></div>
      <div className="flex justify-center">
        <h1 className="mb-4 text-4xl font-bold text-white">{totalTickets}</h1>
      </div>
      <hr className="my-4 border border-dashed border-gray-500/50" />
      <div className="text-center mt-5">
        <div>
          Menu del Día {totalTickets} <br /> <br />
          <div className="mb-6"> {text} </div>
          <Button color="primary" onClick={handleReservar}>
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardTicket;
