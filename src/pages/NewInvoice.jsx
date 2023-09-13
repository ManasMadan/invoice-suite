import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";

export default function NewInvoice() {
  const [senderAddress, setSenderAddress] = useState({
    street: "",
    city: "",
    postCode: "",
    country: "",
  });
  const [clientsAddress, setClientsAddress] = useState({
    street: "",
    city: "",
    postCode: "",
    country: "",
  });
  const [items, setItems] = useState([
    {
      name: "",
      quantity: "",
      price: "",
      total: "",
    },
  ]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    paymentDueDate: "",
    invoiceTitle: "",
    description: "",
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: senderAddress,
    clientsAddress: clientsAddress,
    items: items,
  });

  useEffect(() => {
    console.log(invoiceDetails);
  }, [invoiceDetails]);

  return (
    <div className="flex w-full px-6 py-14 h-fit">
      <div className="flex w-full gap-12">
        <Input
          className="w-full"
          variant="faded"
          labelPlacement="outside"
          isRequired
          label="Invoice Title"
          type="text"
          value={invoiceDetails.invoiceTitle}
          onChange={(e) =>
            setInvoiceDetails((prev) => {
              return { ...prev, invoiceTitle: e.target.value };
            })
          }
        />
        <Input
          className="w-full"
          variant="faded"
          labelPlacement="outside"
          isRequired
          label="Invoice Description"
          type="text"
          value={invoiceDetails.description}
          onChange={(e) =>
            setInvoiceDetails((prev) => {
              return { ...prev, description: e.target.value };
            })
          }
        />
      </div>
    </div>
  );
}
