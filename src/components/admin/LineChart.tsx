import {
  ResponsiveContainer,
  LineChart as ReChartLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  heading: string;
  data: any[];
  name: string;
  value: string;
}

export default function LineChart(props: Props) {
  return (
    <div className="p-4 bg-slate-800 rounded-2xl">
      <h4 className="text-slate-300 text-tight mb-2 font-medium">
        {props.heading}
      </h4>
      <ResponsiveContainer minWidth={240} minHeight={135} aspect={16 / 9}>
        <ReChartLineChart data={props.data}>
          <Line
            type="monotone"
            dataKey={props.value}
            stroke="#facc15"
            fill="#1e293b"
          />
          <XAxis dataKey={props.name} stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            formatter={(value) => `${value}`}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: 10,
            }}
          />
        </ReChartLineChart>
      </ResponsiveContainer>
    </div>
  );
}
