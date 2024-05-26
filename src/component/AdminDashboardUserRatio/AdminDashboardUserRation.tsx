import { Cell, Pie, PieChart } from "recharts";

const data01 = [
  {
    name: "Guest User",
    value: 500,
    color: "#F39200",
  },
  {
    name: "Host User",
    value: 300,
    color: "#000",
  },
  {
    name: "Property Manager",
    value: 300,
    color: "#925800",
  },
];

const AdminDashboardUserRation = () => {
  return (
    <div className="flex justify-center">
      <PieChart width={730} height={210}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default AdminDashboardUserRation;
