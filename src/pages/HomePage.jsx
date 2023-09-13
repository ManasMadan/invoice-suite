import { Button } from "@nextui-org/react";
import { IonIcon } from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

const pdata = [
  {
    name: "Soldier1",
    age: 3,
    balance: 20,
  },
  {
    name: "Soldier2",
    age: 25,
    balance: 22,
  },
  {
    name: "Soldier3",
    age: 25,
    balance: 20,
  },
  {
    name: " Soldier4",
    age: 24,
    balance: 25,
  },
  {
    name: "Soldier5",
    age: 25,
    balance: 4,
  },
  {
    name: "Soldier6",
    age: 20,
    balance: 8,
  },
];
const LineChartComponent = () => (
  <div className="w-full">
    <ResponsiveContainer
      width="100%"
      aspect={3}
      className="flex justify-center items-center"
    >
      <LineChart
        data={pdata}
        width={500}
        height={300}
        margin={{ top: 5, right: 60, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="name" interval={"preserveStartEnd"} />
        <YAxis dataKey="balance" />
        <Tooltip contentStyle={{ backgroundColor: "#37373f" }} />
        <Legend />
        <Line
          dataKey="balance"
          type="monotone"
          stroke="#a6abff"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const HomePage = () => {
  return (
    <div className="font-inconsolata w-full py-12 px-6 mr-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Button color="primary" className="text-xl">
          <Link to="/invoices/new" className="flex items-center gap-2">
            <IonIcon icon={addCircle} />
            New Invoice
          </Link>
        </Button>
      </div>
      <div className="flex gap-6 flex-col mt-12">
        <div className="flex flex-wrap gap-6">
          <div className="w-[40%] max-w-[350px] aspect-square bg-[#a6abff] p-4 rounded-xl text-black">
            Manas
          </div>
          <div className="w-[40%] max-w-[350px] aspect-square bg-[#37373f] p-4 rounded-xl">
            Madan
          </div>
          <div className="w-full bg-[#37373f] p-4 rounded-xl mb-12">
            <LineChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
