/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, Pie, PieChart } from "recharts";

type IRatio =  {
    name:string,
    value:number,
    color: string,
  }

const AdminDashboardUserRation = ({ userRatio }: { userRatio: IRatio[] }) => {
  return (
    <div className="flex justify-center">
      <PieChart width={730} height={210}>
        <Pie
          data={userRatio}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {userRatio.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default AdminDashboardUserRation;
