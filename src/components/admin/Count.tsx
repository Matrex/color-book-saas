import numberUtil from "../../utils/numberUtil";

interface Props {
  title: string;
  amount: number;
}

export default function Count(props: Props) {
  return (
    <div className="p-4 bg-slate-800 rounded-2xl w-full">
      <h5 className="text-2xl font-semibold leading-tight mb-0.5">
        {numberUtil.toCompact(props.amount)}
      </h5>
      <h6 className="text-slate-400 leading-tight">{props.title}</h6>
    </div>
  );
}
