import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { updateCompanyName } from "../Firebase/firestore";

export default function Settings() {
  const [companyName, setCompanyName] = useState("");
  return (
    <div className="px-6 py-12 w-full">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-12 max-w-md flex items-center gap-8 justify-center">
        <Input
          className="w-full bg-[#37373f] rounded-xl"
          variant="bordered"
          type="text"
          label="Company Name"
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
