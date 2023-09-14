import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import useData from "../hooks/useData";
import { deleteInvoice } from "../Firebase/firestore";

const columns = [
  { name: "Title", uid: "invoiceTitle" },
  { name: "Created At", uid: "createdAt" },
  { name: "Client Name", uid: "clientName" },
  { name: "Invoice Amount", uid: "invoiceTotal" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];
const statusColorMap = {
  paid: "success",
  draft: "danger",
  pending: "warning",
};

export default function Invoices() {
  const [refresh, setRefresh] = React.useState(1);
  const data = useData(refresh);

  const [page, setPage] = React.useState(1);
  const [invoices, setInvoices] = React.useState([]);
  const rowsPerPage = 13;
  const pages = Math.ceil(invoices.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return invoices.slice(start, end);
  }, [page, invoices]);
  useEffect(() => {
    setInvoices(data?.invoices.reverse() || []);
  }, [data]);
  const refreshData = () =>
    setRefresh((prev) => {
      return !prev;
    });

  const renderCell = React.useCallback((invoice, columnKey) => {
    const cellValue = invoice[columnKey];
    let yourDate;
    if (columnKey == "createdAt") {
      yourDate = new Date(cellValue.seconds * 1000);
      yourDate = yourDate.toISOString().split("T")[0];
    }
    switch (columnKey) {
      case "createdAt":
        return yourDate;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[invoice.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="See Invoice">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Invoice">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Invoice">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteInvoice(invoice.uid, refreshData)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex w-full pt-14 px-7">
      <Table
        aria-label="Example table with custom cells"
        bottomContent={
          invoices.length > 10 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={`${Math.random()}`}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
