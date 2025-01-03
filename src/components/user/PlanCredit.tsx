interface Props {
  title: string;
  amount: number;
}

export default function PlanCredit(props: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="font-medium text-2xl">{props.amount}</div>
      <div className="text-sm leading-tight">{props.title}</div>
    </div>
  );
}
