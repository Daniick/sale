import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  SearchIcon,
  VerticalDotsIcon,
} from "../../../components/Icons.jsx";
import { columns, statusOptions } from "../../../components/data.js";
import { capitalize } from "../../../components/Utils.js";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";

const statusColorMap = {
  recibido: "success",
  ordenado: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "nombre",
  "almuerzo",
  "stock",
  "actions",
];

export default function App() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  // Estado para los datos obtenidos de la API
  const [productos, setProductos] = useState([]);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/almuerzos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Eliminar el usuario de la lista local de productos
          setProductos(productos.filter((producto) => producto.id !== id));
        } else {
          // Manejar errores si la solicitud no fue exitosa
          console.error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleDeleteAll = () => {
    if (
      window.confirm("Estas seguro que deseas eliminar todos los almuerzos?")
    ) {
      Promise.all(
        productos.map((producto) =>
          fetch(`http://127.0.0.1:8000/api/almuerzos/${producto.id}`, {
            method: "DELETE",
          })
        )
      )
        .then((responses) => {
          if (responses.every((response) => response.ok)) {
            setProductos([]);
          } else {
            console.error("Failed to delete all products");
          }
        })
        .catch((error) => {
          console.error("Error deleting all products:", error);
        });
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/almuerzos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(productos);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProductos = [...productos];

    if (filterValue) {
      filteredProductos = filteredProductos.filter((producto) =>
        producto.descripcion.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      statusFilter.length !== statusOptions.length
    ) {
      filteredProductos = filteredProductos.filter((producto) =>
        statusFilter.includes(producto.marca)
      );
    }

    return filteredProductos;
  }, [productos, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((producto, columnKey) => {
    const cellValue = columnKey;

    switch (columnKey) {
      case "id":
        return (
          <p className="text-bold text-tiny capitalize text-default-400 text-[16px]">
            {producto.id}
          </p>
        );

      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {producto.dia_semana}
            </p>
          </div>
        );
      case "almuerzo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {producto.menu_descripcion}
            </p>
          </div>
        );

      case "stock":
        return (
          <p className="text-bold text-tiny capitalize text-default-400 text-[16px]">
            {producto.stock}
          </p>
        );
      case "hora":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {producto.hora}
            </p>
          </div>
        );
      case "pagado":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {/* funcion para agrregar cuanto hemos pagado */}
            </p>
          </div>
        );

      case "debido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {/* funcion para que reste total menos pagado */}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  startContent={<EditIcon className={iconClasses} />}
                >
                  <Link to={`/roles/edit/${producto.id}`}>Edit</Link>
                </DropdownItem>

                <DropdownItem
                  startContent={<DeleteIcon className={iconClasses} />}
                  onClick={() => handleDelete(producto.id)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return typeof cellValue === "object"
          ? JSON.stringify(cellValue)
          : cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  //exportacion
  const options = [5, 10, 15];
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(JSON.stringify(productos), 10, 10);
    doc.save("data.pdf");
  };

  const handleExportCSV = () => {
    const formattedData = productos.map((item) => ({
      id: item.id,
      name: item.name,
      precio: item.precio,
      codigo: item.codigo,
      marca: item.marca,
      categoria: item.categoria,
      avatar: item.avatar,
      costo: item.costo,
    }));

    const csv = Papa.unparse(formattedData);
    const csvBlob = new Blob([csv], { type: "text/csv" });
    saveAs(csvBlob, "data.csv");
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-between gap-3 items-end ">
          <Input
            isClearable
            className="border-2 border-blue-500 rounded-xl w-[30%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  className="bg-blue-500 text-white"
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  className="bg-blue-500 text-white"
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-medium">
            Total {productos.length} productos
          </span>
          <label className="flex items-center text-default-400 text-medium">
            Rows per page:
            <select
              className="ml-[20px] bg-transparent outline-none text-default-400 text-medium rounded-md"
              onChange={onRowsPerPageChange}
            >
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className=" flex gap-4 ">
          <button
            onClick={handleExportCSV}
            className=" bg-blue-500  hover:bg-blue-700 text-white font-bold py-[6px] px-4 rounded"
          >
            Export to CSV
          </button>
          <button
            className=" bg-blue-500  hover:bg-blue-700 text-white font-bold py-[6px] px-4 rounded"
            onClick={handleExportPDF}
          >
            Export to PDF
          </button>
          <div>
            <Button
              color="warning"
              className="w-[130px] font-bold"
              onClick={handleDeleteAll}
            >
              Eliminar todos
            </Button>
          </div>
          <div>
            <Link to="/compras/add">
              <Button color="primary" className="w-[130px] absolute right-0">
                Añadir Almuerzo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    productos.length,
    onSearchChange,
    filteredItems.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <Pagination
        total={pages}
        page={page}
        onPageChange={setPage}
        onItemsPerPageChange={setRowsPerPage}
      />
    );
  }, [pages, page, rowsPerPage]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No productos found"} items={sortedItems}>
        {(producto) => (
          <TableRow key={producto.id}>
            {(columnKey) => (
              <TableCell>{renderCell(producto, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
