import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { updateCompanyName } from "../Firebase/firestore";

export default function Settings() {
  const [companyName, setCompanyName] = useState("");
  return (
    <div className="px-6 py-12 w-full">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-12 max-w-md flex items-end gap-8">
        <Input
          variant="faded"
          type="text"
          label="Company Name"
          labelPlacement="outside"
          placeholder="ex. Invoice Suite"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Button color="primary" onClick={() => updateCompanyName(companyName)}>
          Update
        </Button>
      </div>
    </div>
  );
}
