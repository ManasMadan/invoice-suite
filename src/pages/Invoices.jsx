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
  const data = useData();

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
    setInvoices(data?.invoices || []);
  }, [data]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "invoiceTitle":
        return cellValue;
      case "createdAt":
        return <div>Created At</div>;
      case "clientName":
        return <div>Client Name</div>;
      case "invoiceTotal":
        return <div>Invoice Amount</div>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
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
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
            <TableRow key={JSON.stringify(item)}>
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
