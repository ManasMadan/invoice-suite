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
  PieChart,
  Pie,
} from "recharts";
import { walletOutline, refreshOutline } from "ionicons/icons";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";

const LineChartComponent = ({ pdata }) => (
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
        <XAxis dataKey="day" interval={"preserveStartEnd"} />
        <YAxis dataKey="amount" />
        <Tooltip contentStyle={{ backgroundColor: "#37373f" }} />
        <Legend />
        <Line
          dataKey="amount"
          type="monotone"
          stroke="#a6abff"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
const PieChartComponent = ({ pdata }) => (
  <div className="w-full h-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={300}>
        <Pie
          data={pdata}
          dataKey="amount"
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={120}
          fill="#aca6ff"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const HomePage = () => {
  const [refresh, setRefresh] = useState(0);
  const data = useData(refresh);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!data) return;
    let sum = 0;
    data.lastWeekMetric.forEach((element) => {
      sum += element.amount;
    });
    setTotal(sum);
  }, [data]);

  return (
    <div className="font-inconsolata w-full py-12 px-6 mr-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold gap-2 flex items-center">
          Weekly Insights
          <IonIcon icon={refreshOutline} onClick={() => setRefresh(!refresh)} />
        </h1>
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
            <div className="flex flex-col">
              <div className="text-xl font-bold flex items-center gap-4">
                <IonIcon
                  className="bg-white p-1 rounded-md"
                  icon={walletOutline}
                />
                <div>Amount Processed</div>
              </div>
              <div>
                <img src="/images/homepage_image.svg" />
              </div>
              <div className="text-4xl font-bold">${total}</div>
            </div>
          </div>
          <div className="w-[40%] max-w-[350px] aspect-square bg-[#37373f] p-4 rounded-xl">
            {data ? <PieChartComponent pdata={data.lastWeekMetric} /> : null}
          </div>
          <div className="w-full bg-[#37373f] p-4 rounded-xl mb-12">
            {data ? <LineChartComponent pdata={data.lastWeekMetric} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
