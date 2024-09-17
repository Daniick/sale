import React from "react";
const columns = [
  { name: "ID", uid: "id", sortable: true },

  { name: "PALABRA", uid: "palabra" },
  { name: "ESPANOL", uid: "espanol" },
  { name: "INGLES", uid: "ingles" },

  { name: "IMAGEN", uid: "imagen" },
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "DESCRIPCION", uid: "descripcion" },
  { name: "FECHA", uid: "fecha" },
  { name: "HORA", uid: "hora" },
  { name: "URL", uid: "url" },
  { name: "FECHA DE CREACION", uid: "fecha de creacion" },
  { name: "ROL", uid: "rol" },
  { name: "ESTADO", uid: "estado" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Ordenado", uid: "ordenado" },
  { name: "Recibido", uid: "recibido" },
  // { name: "Vacation", uid: "vacation" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    precio: "500000 COP",
    codigo: "ABC123",
    marca: "active",
    categoria: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    costo: "530000 COP",
  },
  {
    id: 2,
    name: "Zoey Lang",
    precio: "750000 COP",
    codigo: "XYZ456",
    marca: "paused",
    categoria: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    costo: "720000 COP",
  },
  {
    id: 3,
    name: "Jane Fisher",
    precio: "350000 COP",
    codigo: "DEF789",
    marca: "active",
    categoria: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    costo: "380000 COP",
  },
];

export { columns, users, statusOptions };
