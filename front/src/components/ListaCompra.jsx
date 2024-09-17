import React, { useState } from "react";
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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { EyeIcon } from "./EyeIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "./Utils";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";
import Papa from "papaparse";
// import XLSX from "xlsx";
import jsPDF from "jspdf";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "imagen",
  "nombre",
  "codigo",
  "marca",
  "categoria",
  "costo",
  "precio",
  "actions",
];

export default function List() {
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

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.marca)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "imagen":
        return <User avatarProps={{ radius: "lg", src: user.avatar }}></User>;
      case "nombre":
        return (
          <p className="text-bold text-tiny capitalize text-default-400 text-[16px]">
            {user.name}
          </p>
        );

      case "codigo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "marca":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.marca]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
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
                  startContent={<EyeIcon className={iconClasses} />}
                >
                  View
                </DropdownItem>
                <DropdownItem
                  startContent={<EditIcon className={iconClasses} />}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  startContent={<DeleteIcon className={iconClasses} />}
                >
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
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
  const [csvData, setCsvData] = useState([]);

  //   const handleExportExcel = async () => {
  //     const xlsx = await import("xlsx");
  //     const worksheet = xlsx.utils.json_to_sheet(users);
  //     const workbook = xlsx.utils.book_new();
  //     xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //     xlsx.writeFile(workbook, "data.xlsx");
  //   };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(JSON.stringify(users), 10, 10);
    doc.save("data.pdf");
  };

  const handleExportCSV = () => {
    const formattedData = users.map((item) => ({
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
    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(csvBlob, "data.csv");
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-between  gap-3 items-end ">
          <Input
            isClearable
            className="w-full sm:max-w-[30%] h-8 rounded-md mb-4"
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
            Total {users.length} users
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
          {csvData.length > 0 && (
            <CSVLink
              data={csvData}
              filename={"data.csv"}
              className="mt-2 block"
              target="_blank"
            >
              Download CSV
            </CSVLink>
          )}
          <button
            className=" bg-blue-500  hover:bg-blue-700 text-white font-bold py-[6px] px-4 rounded"
            onClick={handleExportPDF}
          >
            Export to PDF
          </button>
        </div>
        <div>
          {/* Botón para exportar a Excel */}
          {/* <button onClick={handleExportExcel}>Export to Excel</button> */}
          {/* Botón para exportar a PDF */}

          {/* Resto del código... */}
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-medium text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button  className="bg-blue-500 hover:bg-blue-700 text-white text-[15px] "
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white text-[15px] "
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
