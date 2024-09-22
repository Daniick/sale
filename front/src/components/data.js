import React from "react";
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "IMAGEN", uid: "imagen" },
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "HORA", uid: "hora" },
  { name: "CURSO", uid: "curso" },
  { name: "ALMUERZO", uid: "almuerzo" },
  { name: "STOCK", uid: "stock" },
  { name: "DIA", uid: "dia" },
  { name: "ROL", uid: "rol" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Ordenado", uid: "ordenado" },
  { name: "Recibido", uid: "recibido" },
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
